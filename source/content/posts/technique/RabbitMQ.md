---
title: "RabbitMQ - Demo with python"
date: 2020-02-08T08:31:11+07:00
draft: false
author: "lhsang"
tags: ["Technique", "Message broker", "RabbitMQ"]
categories: ["Kỹ thuật"]
comment: "https://www.lhsang.me/blog/technique/RabbitMQ/"
---

 ![rabbitMQ](/img/posts/technique/rabbitmq/rabbitMQ.png)

__1. Message-boker ?__

- Là chương trình đóng vai trò trung gian lưu trữ cũng như điều phối (valadating, transforming, routing messages) các yêu cầu (message) giữa sender và reciever.
- Mesage-boker có 2 hình thức giao tiếp cơ bản là:
    - Publish và Subscribe (Topics)
    - Point-to-Point (Queues)

__2. RabbitMQ là gì ?__

- RabbitMQ là một message boker (message-oriented middleware) hay còn gọi là phần mềm quản lý hàng đợi message (thường được gọi là môi giới message hay trình quản lý message).
  Nói đơn giản đây là phần mềm định nghĩa hàng đợi một ứng dụng khác có thể kết nối tới để bỏ message vào và gửi message dựa trên nó.

    Message: ở đây có thể chứa nhiều kiểu thông tin. Ví dụ như thông tin về một process/task để khởi động một ứng dụng nào đó (nằm trên một server khác), hoặc có thể là một message chứa text đơn giản.

- RabbitMQ hỗ trợ nhiều giao thức (AMQP, STOMP, MQTT, HTTP and Websockets), tuy nhiên phương thức phố biến nhất mà rabbitmq sử dụng là AMQP - Advanced Message Queue Protocol

 ![message-queue-small](/img/posts/technique/rabbitmq/message-queue-small.png)


- Phần mềm quản lý hàng đợi chứa các message cho đến khi ứng dụng nhận đến lấy message.

* __Một số thuật ngữ trong RabbitMQ__
    - __Producer__: Bên phát hành message (publisher)
    - __Consumer__: Bên nhận tin (subscriber)
    - __Exchange__: Làm nhiệm vụ điều hướng message từ producer đến các queue bên trong do các message không được công khai trực tiếp trong queue.<br>
    - __Routing key__: Là một khóa mà exchange dùng nó để quyết định cách đưa vào hàng đợi. Routing key có thể hiểu như một địa chỉ của message.
    - __Queues__: có nhiệm vụ lưu trữ bản tin được gửi lên
    - __Connection__: Là một kết nối TCP giữa ứng dụng của bạn và RabbitMQ
    - __Channel__: Một channel là một kết nối ảo bên trong một connection. Khi bạn đẩy đi hoặc nhận các message từ hàng đợi, tất cả phải đi qua channel
    - __Binding__: Là một kết nối giữa hàng đợi và exchange
    - __User__: người dùng có thể kết nối đến #RabbitMQ bằng username/password. Mỗi người dùng được cấp quyền như đọc, ghi và cấu hình quyền bên trong một instance. User còn có quyền trên một host ảo.
    - __Virtual Host__: Cung cấp chức năng tách ứng dụng dùng trên cùng #RabbitMQ. Người dùng khác nhau có quyền hạn khác nhau trên virtual host, hàng đợi hay exchange khác nhau. Chúng chỉ tồn tại trong một virtual host.

__3. Tại sao dùng RabbitMQ ?__

* __Problems:__
    - Đối với các hệ thống sử dụng kiến trúc microservice thì việc gọi chéo giữa các service quá nhiều khiến luồng xử lý khá phức tạp.
    - Mức độ trao đổi data giữa các thành phần tăng lên khiến cho việc lập trình trở nên khó khăn (maintain).
    - Khi phát triển làm sao để dev tập trung vào các domain, business logic thay vì các công việc trao đổi ở tầng infrastructure.
    - Với các hệ thống phân tán, khi việc giao tiếp giữa các thành phần đòi hỏi chúng phải biết nhau. Nhưng điều này rắc rối cho việc viết code.
      Một thành phần phải viết quá nhiều đâm ra rất khó maintain, debug

* __Sử dụng RabbitMQ:__
    - Một producer không cần phải biết comsumer. Nó chỉ việc gởi message đến các queue trong message-boker. Consumer chỉ việc đăng ký nhận message từ queue này.
    - Vì producer giao tiếp với consumer trung gian qua message broker nên dù producer và consumer có khác biệt nhau về ngôn ngữ thì giao tiếp vẫn thành công.(Hiện nay rabbitmq   đã hỗ trợ rất nhiều ngôn ngữ khác nhau).
    - Một đặc tính của rabbitmq là bất đồng bộ(asynchronous). Producer không thể biết khi nào message đến được consumer hay khi nào message được consumer xử lý xong. Đối với producer, đẩy message đến message broker là xong việc. Consumer sẽ lấy message về khi nó muốn. Đặc tính này có thể được tận dụng để xây dựng các hệ thống lưu trữ và xử lý log.

__4. Exchange__

Mặc định exchange là chuỗi "". Một exchange có thể có nhiều queue.<br>
Exchange có 4 loại:<br>
- __Fanout__: Một Fanout exchange sẽ đẩy message đến toàn bộ hàng đợi gắn với nó. <br>
- __Direct__: Một Direct exchange sẽ đẩy message đến hàng đợi dựa theo khóa định tuyến – __routing key__ (do producer khai báo).<br>
    Ví dụ, nếu hàng đợi gắn với một exchange có binding key là pdfprocess, message được đẩy vào exchange với routing key là pdfprocess sẽ được đưa vào hàng đợi.<br>
- __Topic__: Một topic exchange sẽ làm một lá bài (gọi là wildcard) để gắn routing key với một routing pattern khai báo trong binding<br>
    Consumer có thể đăng ký những topic mà nó quan tâm. Cú pháp được sử dụng ở đây là * và #. <br>
    __Ví dụ:__ <br>
        - booking.* -> Được đăng ký bởi tất cả những key với pattern bắt đầu bằng booking.<br>
        - booking.# -> Được đăng ký bởi tất cả các key booking hoặc bắt đầu với booking <br>
- __Headers__: Một header exchange sẽ dùng các thuộc tính header của message để định tuyến. Headers Exchange rất giống với Topic Exchange, nhưng nó định tuyến dựa trên các giá trị tiêu đề thay vì các khóa định tuyến.<br>
- __Dead Letter Exchange__: Nếu không tìm thấy hàng đợi phù hợp cho tin nhắn, tin nhắn sẽ tự động bị hủy. RabbitMQ cung cấp một tiện ích mở rộng AMQP được gọi là “Dead Letter Exchange” — Cung cấp chức năng để chụp các tin nhắn không thể gửi được.

__5. Workflow của RabbitMQ ?__


 ![exchanges-bidings-routing-keys.](/img/posts/technique/rabbitmq/exchanges-bidings-routing-keys.png)


1. Producer đẩy message vào exchange. Khi tạo exchange, phải mô tả nó thuộc loại gì.
2. Sau khi exchange nhận message, nó chịu trách nhiệm định tuyến message. Exchange sẽ chịu trách về các thuộc tính của message, ví dụ routing key, phụ thuộc loại exchange.
3. Việc binding phải được tạo từ exchange đến hàng đợi. Trong trường hợp như ảnh, ta sẽ có hai binding đến hai hàng đợi khác nhau từ một exchange. Exchange sẽ định tuyến message vào các hàng đợi dựa trên thuộc tính của của từng message.
4. Các message nằm ở hàng đợi đến khi chúng được xử lý bởi một consumer.
5. Consumer xử lý message.

__6. Thử bắn và nhận msg với rabbitmq (python)__

- Tạo một service gởi - sender.py: với queue tên 'demo', exchange 'logs' đẩy msg đến toàn bộ queue (exchange_type='fanout'). Bắn msg với routing_keys='key1', nội dung trong body

```python
import pika

# using CloudAMQP (https://www.cloudamqp.com/)
CLOUDAMQP_URL = 'amqp://vvrzbnja:2xdFFhXnVM2o0QyeU6ynPHrgr9V5C8rK@woodpecker.rmq.cloudamqp.com/vvrzbnja'

# establish a connection with RabbitMQ server.
params = pika.URLParameters(CLOUDAMQP_URL)
connection = pika.BlockingConnection(params)
channel = connection.channel()

# create queue with name 'demo'
channel.queue_declare(queue='demo')
channel.exchange_declare(exchange='logs', exchange_type='fanout')

# Ready to send a message
channel.basic_publish(exchange='logs',
                      routing_key='key1',
                      body='Hello world!')

print(" Sent message")
# close connection
connection.close()
```

- Service nhận message- receiver.py. Đăng ký nhận msg ở queue 'demo'

```python
import pika

CLOUDAMQP_URL = 'amqp://vvrzbnja:2xdFFhXnVM2o0QyeU6ynPHrgr9V5C8rK@woodpecker.rmq.cloudamqp.com/vvrzbnja'

# Access the CLODUAMQP_URL environment variable and parse it (fallback to localhost)
params = pika.URLParameters(CLOUDAMQP_URL)
connection = pika.BlockingConnection(params)
channel = connection.channel()  # start a channel
channel.queue_declare(queue='demo')  # Declare a queue


def callback(ch, method, properties, body):
    print(" [x] Received " + str(body))


channel.basic_consume('hello',
                      callback,
                      auto_ack=True)

print(' [*] Waiting for messages:')
channel.start_consuming()
connection.close()

```

- __Run__
```shell
    $ python sender.py
    $ python receiver.py
```

![Sender](/img/posts/technique/rabbitmq/sender.png)

![Result](/img/posts/technique/rabbitmq/result.png)


__References:__<br>
[RabbitMQ for beginners - What is RabbitMQ?](https://www.cloudamqp.com/blog/2015-05-18-part1-rabbitmq-for-beginners-what-is-rabbitmq.html) <br>
[Những điều cần biết về RabbitMQ](https://medium.com/@buihuycuong/nh%E1%BB%AFng-%C4%91i%E1%BB%81u-c%E1%BA%A7n-bi%E1%BA%BFt-v%E1%BB%81-rabbitmq-354a37ecf218)<br>
[RabbitMQ và Kafka](https://dodangquan.blogspot.com/2018/10/rabbitmq-va-kafka-phan-1-hai-he-thong-truyen-tin-khac-nhau.html)
