---
title: "Microservices Communication"
date: 2020-08-02T15:12:42+07:00
draft: true
author: "lhsang"
tags: ["Technique", "Microservices"]
categories: ["Kỹ thuật", "Trải nghiệm", "Viết vu vơ", "Bài viết hay từ diễn đàn"]
comment: "http://www.lhsang.me/blog/technique/microservices-communication"
---

Microservices - một hệ thống gồm nhiều services. Từ kiến trúc monolithic chuyển sang Microservices thì việc giao tiếp là một thách thức khá lớn, các modules không còn chung một service trong một process và nằm trên một server nữa mà là các services riêng lẽ theo mô hình distributed service.

Phụ thuộc vào tính chất của mỗi service thì sẽ có phương pháp để giao tiếp khác nhau như:
- HTTP Commutnication.
- Message Communication.
- Event-driven Communication.
