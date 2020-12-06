---
title: "Behind a SELECT Query"
date: 2020-12-05T17:37:43+07:00
draft: true
author: "lhsang"
tags: ["Technique"]
categories: ["Kỹ thuật", "Bài viết hay từ diễn đàn", "Database", "PostgreSQL"]
comment: "https://www.lhsang.me/posts/technique/behind-a-select-query/"
---

Câu truy vấn __SELECT__ thường xuyên dùng, liệu rằng chúng ta đã hiểu nó hoạt động như thế nào khi bấm __Run__ chưa? Bài viết này mình vô tình đọc được từ medium nên hôm nay mình sẽ vietsub lại đồng thời tìm hiểu và bổ sung thêm. Mình sẽ chọn PostgreSQL để phân tích như bài viết, cơ bản thì các cơ sở dữ liệu quan hệ khác cũng tương tự.

### I. Kiến trúc cơ bản của PostgreSQL DB
![Postgres architecture](/img/posts/technique/behind-a-select-query/postgresql-architecture.jpg)

PostgreSQL sử dụng kiến trúc client/server. Giống như một ứng dụng client/server như chúng ta biết, client và server có thể nằm ở khác hosts. Chúng kết nối thông qua TCP/IP
- A server-side: quản lý các database files, các connection giữa client và database
- Front-end applications: có thể là một ứng dụng, web server hoặc là một tool quản lý database.

PostgreSQL server có thể handle đồng thời nhiều requests từ client. Để làm được điều này, nó sẽ nhân bản (fork) một process cho mỗi request. Clietn và server sẽ giao tiếp qua đó, không qua process gốc (original process) nữa. 

### II. Luồng đi của một câu query (The Path of a Query)

#### 1. Thiết lập Connection, truyền query và chờ kết quả

#### 2. Phân tích câu queryn (Parsing the query)

#### 3. Xử lý lại câu query ( The Rewrite)

#### 4. Lên kế hoạch truy vấn (The query plan)

#### 5. Thực thi (Executor)


### References.
- [Architectural Fundamentals](https://www.postgresql.org/docs/9.1/tutorial-arch.html)
- [What’s behind a simple SQL query?](https://towardsdatascience.com/whats-behind-a-simple-sql-query-c78e3ded8321)
- [Architecture of PostgreSQL DB](https://medium.com/swlh/architecture-of-postgresql-db-d6b1ac4cc231)
- [Get to know PostgreSQL!](https://www.slideshare.net/oddbjorn/Get-to-know-PostgreSQL)
