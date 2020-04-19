---
title: "Nginx là gì ? Demo load balancing với nginx"
date: 2020-02-17T21:18:58+07:00
draft: false
author: "lhsang"
tags: ["Technique",  "Nginx"]
categories: ["Kỹ thuật"]
comment: "http://www.lhsang.me/blog/technique/Nginx/"
---

![Nginx](/img/posts/technique/nginx/nginx.png)

### 1. What is Nginx?
- Nginx ban đầu được tạo ra như một máy chủ web để giải quyết vấn đề __C10k__ (là một vấn đề liên quan đến vấn đề hiệu suất xử lý 10.000 kết nối cùng lúc), nhưng bây giờ với các tính năng mở rộng Nginx cũng được sử dụng phổ biến như một máy chủ proxy (reverse proxy server), HTTP cache hoặc dùng làm cân bằng tải (load balancer).
- Nginx được thiết kế khả năng chịu tải đồng thời cao và tốc độ cực nhanh. Nginx cấu hình dễ dàng hơn so với __Apache httpd__ 
- Reverse proxy khi có nhiều web services listen trên nhiều port và cần một single public endpoint để định tuyến lại internal requests (cho phép dùng nhiều domain trên port 80).

### 2. Nginx architecture.

- Kiến trúc cơ bản của __nginx__ bao gồm __1 master process__ và __các workers__.
    - __master process__ thực hiện các hoạt đông đặc quyền như đọc config và binding đến các port, sau đó tạo ra các processes con (3 loại process con).
    - __cache loader process__ (load cache) chạy khi khởi động để load bộ đệm trên đĩa vào RAM rồi exit. Nó được lên kế hoạch hoạt động, nên nhu cầu resource rất thấp.
    - __cache manager process__ (quản lý cache) chạy định kỳ và chia các mục từ cache trên đĩa để giữ chúng vừa với kích thước được cấu hình.
    - __worker processes__ xử lý network connections, read và write vào đĩa và liên lạc với các upstream server. Mỗi worker process là một single-thread và chạy độc lập với nhau, chúng liên lạc với nhau thông qua bộ nhớ dùng chung cho dữ liệu cache dùng chung, dữ liệu lưu phiên và các tài nguyên dùng chung khác.

![Architecture](/img/posts/technique/nginx/architecture.png)

### 3. Nginx sử dụng single thread

![Traditional server](/img/posts/technique/nginx/traditional-server-vs-NGINX-worker.png)

- NGINX sử dụng cơ chế asynchronous và event-driven để handle tất cả các connection. Để đạt được điều này nginx hoạt động trên các socket ở chế độ non-blocking và sử dụng một số phương pháp khác như epoll và kqueue.
Đây là điểm khác biệt của nginx so với một số server khác, nginx có thể handle đồng thời hàng triệu request và khả năng scale rất tốt.

- Tuy nhiên vấn đề asynchronous và event-driven vẫn có những problem, nếu nhiều module thứ 3 hoặc chính dev sử dụng __blocking__ thì nginx mất đi thế mạnh vốn có.

### 4. Giải quyết vấn đề blocking.
> to be continue

### 5. Thử load balancing dùng nginx.
- __Mô tả ngắn:__
    - Chạy web app(flask) trên 2 server (demo dùng 2 port).
    - Dùng nginx để load balancing trên 2 server.
    
  ![Traditional server](/img/posts/technique/nginx/jqannxrhnf_load-balancing-traffic.gif)
    
- __Let's start__:

    - Điều chỉnh tường lửa allow cho Nginx HTTP (port 80)

    ```shell
        $ sudo ufw allow 'Nginx HTTP'
    ```
    - Verify
    
  ![Status](/img/posts/technique/nginx/status.png)

    - Demo flask app
    ```python
        from flask import Flask
        app = Flask(__name__)

        @app.route('/index')
        def demo():
            return 'hello world'
    ``` 

    - Config nginx (/etc/nginx/nginx.conf)
    ```
        upstream demo {
            server 127.0.0.1:8080;
            server 127.0.0.1:8000;
        }

        server {
            listen 80;

            location / {
                proxy_pass http://demo;
            }
        }
    ```
    - Reload service nginx.
    ```shell
        $ sudo service nginx reload
    ```
    - Chạy web app trên port 8080 và 8000 giống như đã config
    ```shell
        $ flask run --port=8080
        $ flask run --port=8000
    ```

  ![Run](/img/posts/technique/nginx/runserver.png)

    - Thuật toán load balancing mặc định của Nginx là __Round robin__(các máy chủ sẽ được lựa chọn tuần tự, vòng tròn), chúng ta có thể config lại một thuật toán khác nếu muốn.

    - Kết quả.

    __Lần đầu request được điều hướng tới server với port 8080__
  ![Run](/img/posts/technique/nginx/r1.png)

    __Lần request tiếp theo được điều hướng đến server port 8000__
  ![Run](/img/posts/technique/nginx/r2.png)


### References
- [Nginx Tutorial #1: Basic Concepts](https://www.netguru.com/codestories/nginx-tutorial-basics-concepts)
- [Nginx Tutorial](https://www.devdungeon.com/content/nginx-tutorial#intro_to_nginx)
- [An Introduction to NGINX for Developers](https://www.freecodecamp.org/news/an-introduction-to-nginx-for-developers-62179b6a458f/)
- [Inside NGINX: How We Designed for Performance & Scale](https://www.nginx.com/blog/inside-nginx-how-we-designed-for-performance-scale/)
- [nginx](http://www.aosabook.org/en/nginx.html)
- [How to configure load balancing using Nginx](https://upcloud.com/community/tutorials/configure-load-balancing-nginx/)
- [Thread Pools in NGINX Boost Performance 9x!](https://www.nginx.com/blog/thread-pools-boost-performance-9x/)

{{< css.inline >}}
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v5.0&appId=845465725827033&autoLogAppEvents=1"></script>
<div class="fb-comments" data-href="http://www.lhsang.me/blog/technique/Nginx/" data-width="100%" data-numposts="5"></div>
{{< /css.inline >}}
