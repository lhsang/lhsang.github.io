---
title: "Mutithreading Concurrency Problems"
date: 2020-08-07T15:24:23+07:00
draft: true
author: "lhsang"
tags: ["Technique"]
categories: ["Kỹ thuật", "Threading"]
comment: "https://www.lhsang.me/"
---

### Process và Thread
 Process là một thực thể hoạt động của một chương trình, có vùng nhớ riêng và các process hoạt động riêng lẻ không tác động lẫn nhau.
 Thread là một luồng nằm trong process, trong một process có thể có nhiều thread, các Thread này dùng chung vùng nhớ trong process và có thể chia sẻ tài nguyên. Đương nhiên khi dùng chung vùng nhớ sẽ xảy ra một số vấn đề, bài này mình sẽ trình bày một số vấn đề khi lập trình đa luồng (Multithreading programing) chúng ta thường hay gặp.

![Thread](/img/posts/technique/multithread/thread-process.png)

### Phân biệt Concurrency vs Parallelism
- Concurrency: một ứng dụng thực hiện nhiều task cùng một lúc nhưng không phải đồng thời. Ví dụ có 2 task muốn thực hiện đồng thời nhưng chỉ có 1 core CPU thì CPU sẽ quyết định thực hiện task đầu tiên rồi thực hiện task thứ 2 hoặc thực hiện 1 phần task này rồi thực hiện 1 phần task kia,...

![Concurrency](/img/posts/technique/multithread/concurrent-2-50.png)


- Parallelism: một ứng dụng chia nhỏ task thành các subtasks và sẽ chia ra cho các CPU xử lý song song đồng thời, như vậy thì khi CPU 1 core thì chúng ta chỉ thực hiện concurrency chứ không thể pararellism.

![Parallelism](/img/posts/technique/multithread/parallel-2-50.png)

### Issues when mutithreading
#### 1. Shared access to data
Ví dụ: Một biến x = 0, có 2 thread muốn tăng giá trị của x lên 1 đơn vị. Vấn đề xảy ra khi T1 đọc x (0) và tăng lên 1, tuy nhiên khi chưa ghi xuống lại thì T2 lại đọc x (0) rồi tăng lên 1, giờ T1 ghi xuống 1 và T2 ghi xuống 1. Vậy giá trị mong muốn là 2 nhưng kết quả thì chỉ có 1.


### Tham khảo
- [Concurrency vs. Parallelism — A brief view](https://medium.com/@itIsMadhavan/concurrency-vs-parallelism-a-brief-review-b337c8dac350)
- [4 Problems with Processor Thread Programming](https://insights.dice.com/2018/02/07/4-problems-processor-thread-programming/)
- [Chapter 9 Programming Guidelines](https://docs.oracle.com/cd/E19455-01/806-5257/6je9h0342/index.html)

