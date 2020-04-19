---
title: "Tìm hiểu gRPC"
date: 2020-02-15T08:40:50+07:00
draft: false
author: "lhsang"
tags: ["Technique", "RPC", "HTTP"]
categories: ["Kỹ thuật"]
comment: "http://www.lhsang.me/blog/technique/gRPC/"
---

## gRPC là gì ?
Trong thời điểm hiện tại thì __JSON REST API__ vẫn đang rất phổ biến và phổ thông bởi tính dễ sử dụng. Tuy nhiên để nâng cao hiệu năng cho trang web, chúng ta sẽ tìm hiểu vê một framework RPC mới dựa trên __protocol buffers__ và HTTP/2 của __Google__ có tên là __gRPC__

- __gRPC__ là một __RPC__ platform được phát triển bởi Google nhằm tối ưu hoá và tăng tốc việc giao tiếp giữa các service với nhau trong kiến trúc microservice.

- __gRPC__ dùng __Protocol Buffers__ giảm kích thước request và response data, RPC để đơn giản hoá trong việc tạo ra các giao tiếp giữa các service với nhau và dùng HTTP/2 để tăng tốc gửi/nhận HTTP request.

__1. RPC là gì?__

RPC là từ viết tắc của Remote Procedure Call, nó được xây dựng với ý tưởng là đơn giản hoá việc giao tiếp giữa những service với nhau, thay vì những service giao tiếp với nhau theo kiểu RESTful API thì giờ đơn giản là gọi hàm như những object nói chuyện với nhau thôi, còn việc phân tán các service là chuyện của tương lai không dính liếu đến việc code.

__2. HTTP/2__

HTTP/2 là một phiên bản nâng cấp của HTTP/1.1, HTTP/2 sinh với với mục đích cải thiện tốc độ giao tiếp giữa client/server trên nền tảng Web. 

HTTP/1.1 có nhược điểm là xử lý từng request 1, tức là một request nào đó gởi đến server xử lý xong thì mới gởi request khác đi. Ví dụ khi trang web cần lấy 2 file script.js và style.css với thứ tự tương ứng thì file script.js được trả về xong thì server mới xử lý yêu cầu lấy file style.css. Điều này làm cho thời gian chờ để lấy về tất cả dữ liệu rất tốn thời gian. 

HTTP/2 được ra đời với các mục tiêu: cải thiện tốc dộ giao tiếp, giữ được tính tương thích với HTTP/1và cho phép cả trình duyệt lẫn máy chủ có thể chọn loại giao thức kết nối:

- __Compression(nén) of request headers__

Mỗi request của HTTP sẽ mang rất nhiều data headers đi và đến cho dù nó giống nhau từ request thứ 2 trở đi.
Vì cả client và server đều duy trì một danh sách các headers được sử dụng cho các request trước đó (header frames) nên HTTP/2 sẽ loại bỏ những data headers trùng lặp lại ở những lần request thứ 2 trở đi và nén headers trước khi gửi đi (sử dụng HPACK), sau đó HPACK sẽ tìm kiếm lại header trong header frame để xây dựng lại headers đầy đủ.

![Header](/img/posts/technique/rpc/headers.png)

- __Binary protocol__ 

Browsers sẽ convert text sang binary trước khi gởi qua đường network. Mục đích nhằm giảm kích thước gói tin, tiết kiệm băng thông, giảm chi phí parsing data.

![binary](/img/posts/technique/rpc/binary.png)

- __Request multiplexing over a single TCP connection__

HTTP/2 có thể gửi cùng lúc nhiều request đến qua một kết nối TCP(single TCP) và kết quả được trả về bất đồng bộ với nhau (chú ý là hầu hết trình duyệt cũng có giới hạn TCP connections đến một server).

![multiple](/img/posts/technique/rpc/multiple.png)

- __HTTP/2 Server Push__
Thêm một cách để tối ưu tốc độ loading của website, thay vì phải có request từ client thì server mới trả resource liên quan về, HTTP/2 sẽ hiểu những resource liên quan và đẩy resource về cho client luôn mà không cần client gửi request.

![push](/img/posts/technique/rpc/push.png)

__3. Vậy còn Protocol Buffers ?__

Protocol Buffers gọi tắt là protobuf là ngôn ngữ được phát triển bới Google tạo ra chuẩn sắp xếp mã hóa data với mục đích tạo buffer truyền và nhận giao tiếp một cách linh hoạt, hiệu quả, đơn giản và tăng tốc độ truyền nhận (có vẻ khá giống XML hoặc JSON). Nó lưu trữ dữ liệu có cấu trúc có thể được Serialize hoặc De-Serialized tự động bưởi nhiều ngôn ngữ khác nhau.

Chỉ cần định nghĩa cấu trúc data sử dụng protobuf tạo buffer, sau đó chỉ việc sử dụng hàm thư viện protobuf dễ dàng ghi và đọc cấu trúc data đó đến và từ rất nhiều ngôn ngữ khác nhau. Có thể update lại cấu trúc data nhưng code chương trình sẽ không cần phải thay đổi.

__So sánh một chút với XML và JSON:__

|Protobuf|JSON|XML|
|--------|----|---|
| Không dành cho người đọc vì là binary|Con người có thể đọc và chỉnh sửa dễ dành|Con người có thể có thể đọc và chỉnh sửa dễ dàng|
|Khó decode mà không biết schema, định dạng dữ liệu không rõ ràng|Có thể phân tích mà không cần biết schema|Có thể phân tích cú pháp mà không cần biết schema|
|Xử lý rất nhanh, nhỏ hơn 3 - 10 lần so với XML hoặc JSON|-|-|

Protobuf rất nhanh nhưng có những tình huống không nên sử dụng nó:
- Khi cần hoặc muốn dữ liệu con người có thể đọc dễ dàng.
- Dữ liệu từ Service được sử dụng trực tiếp bởi Browser.

## Demo gRPC using python
[gRPC Basics - Python](https://grpc.io/docs/tutorials/basic/python/)

## References
- [HTTP/2: the difference between HTTP/1.1, benefits and how to use it](https://medium.com/@factoryhr/http-2-the-difference-between-http-1-1-benefits-and-how-to-use-it-38094fa0e95b)
- [Protocol Buffers - Developer Guide](https://developers.google.com/protocol-buffers/docs/overview)
- [gRPC Basics - Python](https://grpc.io/docs/tutorials/basic/python/)
- [Các kỹ sư Eureka đã tối ưu ứng dụng chat sử dụng gRPC như thế nào](https://techtalk.vn/cac-ky-su-eureka-da-toi-uu-ung-dung-chat-su-dung-grpc-nhu-the-nao.html)
- [gRPC official docs](https://grpc.io/docs/)
- [[Web] HTTP2](https://dominhhai.github.io/vi/2017/11/what-is-http2/)
- [Protocol buffers là gì và những điều căn bản cần biết về nó](https://viblo.asia/p/protocol-buffers-la-gi-va-nhung-dieu-can-ban-can-biet-ve-no-maGK7D99Zj2)
