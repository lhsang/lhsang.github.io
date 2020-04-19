---
title: "Sinh viên IT \"bị\" hỏi những gì trong những lần đi phỏng vấn vị trí intern, fresher?"
date: 2020-02-21T08:20:30+07:00
draft: false
author: "lhsang"
tags: ["Experience","Interview"]
categories: ["Trải nghiệm"]
comment: "http://www.lhsang.me/blog/trai-nghiem/intern-fresher-ntd-hoi-gi"
---

 Ngay thời điểm chuẩn bị để đi phỏng vấn một công ty mới thì mình ngồi hệ thống lại một số câu hỏi mà mình đã được hỏi trong các cuộc phỏng vấn trước đây và những câu hỏi basic nhất mà mình nghĩ nhà tuyển dụng sẽ hỏi thì sẵn tiện mình release luôn bài này khi cần thì coi lại để chuẩn bị tốt nhất trong buổi phỏng vấn. Mình vẫn là sinh viên, đến thời điểm này mình đã đi phỏng vấn ở 2 công ty (tuy nhiên bạn bè mình có mặt ở khá nhiều công ty nên kinh nghiệm phỏng vấn thì mình cũng học được rất nhiều họ) và mình chỉ chia sẻ những thứ thuộc phạm trù của mình nên thiếu sót thì sẽ không tránh khỏi. Nếu có gì hay cần bổ sung mời các bạn comment xuống dưới, mình sẵn sàng tranh luận và tiếp thu :D

Bài này thực tế cần hơn khi đi phỏng vấn ở một số công ty mà họ không quan tâm technical skills của bạn về thứ cụ thể mà họ đang làm, có nghĩa là họ cần một người vững kiến thức nền và sau đó họ sẽ đào tạo lại. Nhưng dù là vị trí cao thấp hay công ty nhỏ lớn gì thì những kiến thức như vậy mình nghĩ chúng ta cần nắm vững, không phải chỉ để trả lời phỏng vấn mà là nó rất cơ bản chúng ta phải biết nếu học ngành này.

Thường thì các công ty có quy trình, chương trình __rõ ràng__ cho intern, fresher thì sẽ chia ra ít nhất 2 vòng với 2 loại câu hỏi (Culture fit - Technical)

## Culture fit interview
Đơn giản culture fit là một buổi phỏng vấn về văn hoá và giao tiếp, nơi cả công ty và ứng viên cùng check xem liệu mình và đối phương có phải một “good match” hay không.
Phần này sẽ được phòng nhân sự hỏi, có thể được hỏi trong một buổi riêng hoặc hỏi chung ở đầu, sau khi phỏng vấn technical.

Nhà tuyển dụng (NTD) sẽ có một số câu hỏi hoặc đặt một tình huống hỏi mình giải quyết như thế nào. Tất cả những gì chúng ta cần là chuẩn bị một tâm thế chân thành và thoải mái để vượt qua phần này. Sau 2 lần đi phỏng vấn thì rút ra một số câu mình được hỏi sẽ rơi vào những phạm trù sau:
- Teamwork
- Management
- Motivation
- Desired working culture

Chẳng hạn:
- Khi làm việc nhóm em thường gặp những vấn đề gì khó khăn và em đã giải quyết như thế nào?
- Khi được giao một công việc, bạn sẽ hoàn thành nó như thế nào? Bạn sẽ làm gì khi không thể hoàn thành deadline?
- Kể một lần sai lầm và bị chỉ trích, bạn phản ứng về điều đó như thế nào?
- Mức lương mong muốn của em là bao nhiêu cho vị trí này?

Đừng quên chuẩn bị một bài giới thiệu thật hoành tráng (tôi là ai, điểm mạnh điểm yếu như nào, mục tiêu định hướng rõ ràng, ...)

## Technical

Phần này công ty có thể sẽ cho chúng ta test trước 1 bài trắc nghiệm hay code trên một số trang luyện thuật toán để sàng lọc rôì mới gặp phỏng vấn trực tiếp. Với mức độ bài test ở mức độ trung bình, đạt > range(50%, 70%) là pass (tùy). So với kiến thức hỏi trực tiếp thì bài test hỏi rộng hơn do là trắc nghiệm, rộng nhưng không sâu.

Phỏng vấn technical trực tiếp thì có thể có 1, 2, 3 người, tùy công ty. Kiến thức sẽ rơi vào những môn được học từ năm nhất tới năm 3, có thể hỏi vài câu thực tế liên quan đến vị trí mình apply hoặc liên quan đến công việc cũ của mình (nếu có):

- __Cấu trúc dữ liệu và thuật toán:__ sẽ hỏi những câu cơ bản và kèm theo một câu hỏi ứng dụng, hoặc so sánh 2 cấu trúc liên quan.
    - Mảng, danh sách liên kết (đơn, đôi vòng)
    - Stack & queue
    - Sort, search.
    - Tree (binary, AVL, B-tree)
    - Graph
    - Đệ qui, quy hoạch động
    - Cấu trúc heap, hashtable, hashmap
- __Lập trình hướng đối tượng:__
    - 4 tính chất
    - Phân biệt interface vs abstract, class vs object
    - destructor and constructor
    - design pattern (nhóm, biết những loại nào, khi nào dùng, ví dụ trong thực tế) 
- __Cơ sở dữ liệu:__
    - indexes (cơ chế, các loại index)
    - Delete và Truncate
    - Transaction (các thuộc tính, bài toán thực tế liên quan như 2 user cùng đặt 1 sp nhưng chỉ còn 1 sp)
    - DDL - DML - DCL - TCL. [What is DDL and DML?](https://stackoverflow.com/questions/2578194/what-is-ddl-and-dml)

    ![ddl and dml](/img/posts/technique/intern/ddl-and-dml.png)
    
    - Câu hỏi ngẫu nhiên về version và điểm mạnh điểm yếu các csdl hay viết một truy vấn để lấy record cao thứ n từ bảng chẳng hạn.

- __Mạng máy tính:__
    - TCP vs UDP (so sánh, ứng dụng)
    - HTTP vs HTTPS
    - DNS, DHCP
    - LAN, WAN, MAN
- __Hệ điều hành:__
    - Các thuật toán lập lịch
    - Thread vs process
    - [Race condition](https://tech.bizflycloud.vn/race-condition-la-gi-lam-sao-de-khai-thac-20180116193609705.htm)
    - Deadlock vs lock
    - Một số lệnh cơ bản linux
    - Vùng nhớ heap và stack
- __Kiến thức back-end:__
    - Các phương thức trong RESTful
    - Các thuật toán cache
    - Cookie, session, localstorage
    - Một số kỹ thuật bảo mật
    - Ít nhiều nên có kiến thức về kiến trúc

Mình chỉ liệt kê ra nội dung NTD sẽ hỏi để tham khảo đương nhiên tương ứng với mỗi câu trả lời của bạn thì NTD sẽ bổ sung và hỏi sâu theo hướng nào, bạn cố gắng tìm hiểu, hệ thống lại và trả lời một cách đầy đủ, thông minh nhất có thể.

Trên là những phần mình đã được hỏi khi đi phỏng vấn hy vọng ít nhiều cũng giúp được các bạn đạt được vị trí mong muốn ở công ty mình ước ao <3 

__Good luck!__
