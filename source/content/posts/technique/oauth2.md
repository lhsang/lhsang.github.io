---
title: "Oauth2"
date: 2025-09-06T11:39:16+07:00
draft: true
author: "lhsang"
tags: ["Technique", "Experience", "Security", "OAuth 2.0", "OAuth"]
categories: ["Kỹ thuật", "Security"]
comment: "https://www.lhsang.me/"
---
Hôm này mình trở lại với một chủ đề kỹ thuật sau một thời gian dài vắng bóng. <br>
Chủ đề hôm nay mình muốn chia sẻ với các bạn là về OAuth2 - một giao thức ủy quyền phổ biến trong việc bảo mật ứng dụng web và API. <br>
Bài này sẽ giải thích chi tiết về OAuth2, cách thức hoạt động, các thành phần chính và các luồng ủy quyền (grant type) khác nhau mà nó hỗ trợ.

## OAuth2 là gì?
Trước hết chúng ta phải phân biệt nhanh về Authentication và Authorization:
- __Authentication (Xác thực)__: Xác minh danh tính người dùng, đảm bảo rằng người dùng là ai. Nó trả lời cho câu hỏi "Bạn là ai?".
- __Authorization (Ủy quyền)__: Quyết định người dùng có quyền truy cập vào tài nguyên hay không, dựa trên danh tính đã xác thực.
Nó trả lời cho câu hỏi "Bạn được phép làm gì?".

![Authentication vs Authorization](/img/posts/technique/oauth2/authenvsauthor.png)

OAuth là viết tắt của "Open Authorization" (Ủy quyền mở). OAuth2 là bản nâng cấp của OAuth1.0 <br>
Theo định nghĩa từ trang chủ [OAuth](https://oauth.net/2/), OAuth 2.0 là một giao thức dành cho việc ủy quyền **(Authorization Protocol)**. Có thể bạn nghe hơi lấn cấn nhưng mình sẽ giải thích chi tiết ở phần tới.<br> 
OAuth 2.0 cho phép các ứng dụng bên thứ ba truy cập tài nguyên được bảo vệ trên máy chủ tài nguyên thay mặt cho người dùng/client 
mà không cần chia sẻ thông tin đăng nhập của họ. 
OAuth 2.0 cung cấp một cách an toàn để **cấp quyền truy cập** hạn chế vào tài nguyên mà **không cần tiết lộ thông tin đăng nhập** của người dùng.

Mặc dù web là nền tảng phổ biến nhất sử dụng OAuth 2.0, nhưng nó không giới hạn chỉ trong môi trường web/api. 
OAuth 2.0 có thể được sử dụng trên browser-based, mobile, desktop applications, và thậm chí cả các thiết bị IoT (Internet of Things).

## OAuth2.0 Roles
- OAuth 2.0 định nghĩa bốn vai trò chính:
  - __Resource Owner (Chủ sở hữu tài nguyên)__: thường là user (hoặc là 1 service trong hệ thống nhiều service), người sở hữu tài nguyên mà ứng dụng bên thứ ba muốn truy cập.  
  - __Resource Server (Máy chủ tài nguyên)__: máy chủ lưu trữ tài nguyên được bảo vệ. Đây chính là API mà ứng dụng bên thứ ba muốn truy cập
  - __Client (Ứng dụng khách)__: ứng dụng bên thứ ba muốn truy cập tài nguyên thay mặt cho Resource Owner. Khi truy cập sẽ được ủy quyền của user thông qua Access Token.
  - __Authorization Server (Máy chủ ủy quyền)__: máy chủ chịu trách nhiệm xác thực, kiểm tra thông tin từ Resource Owner và cấp Access Token cho Client. 
  Trường hợp chính là OAuth Server. Đôi khi Resource Server và Authorization Server có thể là cùng một máy chủ.

![Roles](/img/posts/technique/oauth2/roles.png)

## OAuth 2 Process Flow
![Abstract Protocol Flow OAuth2](/img/posts/technique/oauth2/processflow.png)

- Step 1: Client yêu cầu quyền truy cập tài nguyên từ Resource Owner (user).
- Step 2: Resource Owner đồng ý cấp quyền truy cập và ủy quyền cho Client
- Step 3: Client gửi yêu cầu ủy quyền đến Authorization Server, bao gồm thông tin về Resource Owner và phạm vi truy cập mong muốn.
- Step 4: Authorization Server xác thực Resource Owner và kiểm tra thông tin từ Client.
- Step 5: Nếu xác thực thành công, Authorization Server cấp Access Token cho Client.
- Step 6: Client sử dụng Access Token để truy cập tài nguyên từ Resource Server.
- Step 7: Resource Server xác thực Access Token và cấp quyền truy cập tài nguyên cho Client.

## Token
- Token không còn xa lạ gì với các bạn làm về web, API. Token giống “giấy thông hành” mà Authorization Server cấp cho Client sau khi Resource Owner cho phép.
Token đơn giản là 1 đoạn mã được sử dụng để xác thực và ủy quyền truy cập tài nguyên.
- Token thường được mã hóa và có thể chứa thông tin về quyền truy cập, thời gian hết hạn, và các thông tin khác liên quan đến việc ủy quyền.
- Token giúp giảm thiểu việc phải gửi thông tin đăng nhập (username/password) trong mỗi yêu cầu, từ đó tăng cường bảo mật.
- Trong OAuth 2.0, có hai loại token chính:
  - __Access Token__: Token này được sử dụng để truy cập tài nguyên từ Resource Server. 
Access Token thường có thời hạn sử dụng ngắn và được gửi kèm trong các yêu cầu đến Resource Server.
  - __Refresh Token__: Token này được sử dụng để lấy Access Token mới khi Access Token hết hạn. 
Refresh Token thường có thời hạn sử dụng dài hơn và chỉ được sử dụng để lấy Access Token mới từ Authorization Server.

### Token format
- Token có thể được định dạng dưới nhiều dạng khác nhau, phổ biến nhất là JWT (JSON Web Token).
- JWT là một định dạng token tự chứa (self-contained) bao gồm ba phần chính:
  - Header: Chứa thông tin về loại token và thuật toán mã hóa.
  - Payload: Chứa các thông tin về người dùng và quyền truy cập.
  - Signature: Được sử dụng để xác thực tính toàn vẹn của token (đảm bảo token không bị chỉnh sửa).

![Abstract Protocol Flow OAuth2](/img/posts/technique/oauth2/jwt_structure.png)

## OAuth 2.0 Grant Types
Oauth 2.0 hỗ trợ nhiều luồng ủy quyền (grant types) khác nhau để phù hợp với các tình huống sử dụng khác nhau. Dưới đây là một số grant types phổ biến:
- __Authorization Code Grant__: Đây là luồng phổ biến nhất, thường được sử dụng trong các ứng dụng có giao diện người dùng (web app, mobile app). 
Client nhận mã ủy quyền (authorization code) từ Authorization Server và sau đó trao đổi mã này để lấy Access Token.
- __Client Credentials Grant__: Thường được sử dụng trong các ứng dụng máy chủ (server-to-server).
Client sử dụng thông tin xác thực của chính nó để lấy Access Token từ Authorization Server mà không cần Resource Owner.
- __Refresh Token Grant__: Luồng này cho phép Client lấy Access Token mới bằng cách sử dụng Refresh Token khi Access Token hết hạn.
- __Implicit Grant (Deprecated)__: Thường được sử dụng trong các ứng dụng web dựa trên trình duyệt (browser-based applications). 
Client nhận Access Token trực tiếp từ Authorization Server mà không cần mã ủy quyền.
- __Password Grant (Deprecated)__: Trong luồng này, Resource Owner cung cấp trực tiếp tên đăng nhập và mật khẩu cho Client. 
Client sử dụng thông tin này để lấy Access Token từ Authorization Server. Luồng này chỉ nên được sử dụng trong các tình huống đáng tin cậy.

### 1. Authorization Code Grant
![Authorization Code Grant](/img/posts/technique/oauth2/auth_code_grant.svg)

Giả sử bạn sử dụng một ứng dụng web (draw.io - client application) muốn truy cập API của một dịch vụ bên thứ ba (google drive - Oauth Service API) 
thay mặt cho bạn để đọc các file diagram bạn đã lưu trữ trên Drive. Mình sẽ mô tả chi tiết các bước trong luồng Authorization Code Grant như sau:
- Step 1: Ứng dụng web (draw.io) chuyển hướng bạn đến trang đăng nhập của Google (Authorization Server) để xác thực. Bạn sẽ thâý một pop-up hoặc redirect đến trang Google.
- Step 2: Bạn đăng nhập vào Google và cấp quyền cho ứng dụng web (draw.io) truy cập các file trên Drive của bạn.
- Step 3: Sau khi bạn cấp quyền, Google chuyển hướng bạn trở lại ứng dụng web (draw.io) với một mã ủy quyền (authorization code).
- Step 4: Ứng dụng web (draw.io) gửi mã ủy quyền này đến Google (Authorization Server) để đổi lấy Access Token.
- Step 5: Google xác thực mã ủy quyền và trả về Access Token cho ứng dụng web (draw.io).
- Step 6: Ứng dụng web (draw.io) sử dụng Access Token để truy cập API của Google Drive và lấy các file diagram của bạn.
- Step 7: Google Drive xác thực Access Token và trả về các file diagram cho ứng dụng web (draw.io).
Ứng dụng web (draw.io) hiển thị các file diagram cho bạn. <br>
Khi Access Token hết hạn, ứng dụng web (draw.io) có thể sử dụng Refresh Token để lấy Access Token mới từ Google mà không cần bạn phải đăng nhập lại.

### 2. Client Credentials Grant

![Client Credentials Grant](/img/posts/technique/oauth2/client_credentials_grant.png)

Bạn có một ứng dụng máy chủ (server application) muốn truy cập API của một dịch vụ bên thứ ba (ví dụ: một dịch vụ lưu trữ đám mây) để quản lý tài nguyên thay mặt cho chính nó, 
không liên quan đến người dùng cụ thể nào. Mình sẽ mô tả chi tiết các bước trong luồng Client Credentials Grant như sau:
- Step 1: Ứng dụng máy chủ (server application) gửi yêu cầu lấy Access Token đến Authorization Server của dịch vụ bên thứ ba, 
bao gồm thông tin xác thực của chính nó (client ID và client secret).
```bashPOST /token
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
client_id=SERVICE_A
client_secret=abcXYZ123
scope=read write
```
- Step 2: Authorization Server xác thực thông tin xác thực của ứng dụng máy chủ. Nếu xác thực thành công, Authorization Server cấp Access Token cho ứng dụng máy chủ.
- Step 3: Ứng dụng máy chủ sử dụng Access Token để truy cập API của dịch vụ bên thứ ba và quản lý tài nguyên.

### 3. Implicit Grant (Deprecated, not recommended)
![Implicit Grant](/img/posts/technique/oauth2/implicit_grant.png)

- Implicit Grant được thiết kế cho ứng dụng mà token cần được cấp nhanh chóng, cấp trực tiếp cho Client mà không cần bước trao đổi mã ủy quyền.
- Thường được sử dụng trong các ứng dụng web dựa trên trình duyệt (browser-based applications) như Single Page Applications (SPA).
- Tuy nhiên, luồng này có những rủi ro bảo mật, vì Access Token được truyền qua URL và có thể bị lộ nếu không được bảo vệ đúng cách.
- Do đó, hiện nay luồng Implicit Grant không được khuyến khích sử dụng nữa, 
thay vào đó nên sử dụng Authorization Code Grant với PKCE (Proof Key for Code Exchange) để tăng cường bảo mật

### 4. Password Grant (Resource Owner Password Credentials Grant) (Deprecated, not recommended)
![Password Grant](/img/posts/technique/oauth2/password_grant.png)

- Với loại này, Resource Owner (người dùng) cung cấp trực tiếp tên đăng nhập và mật khẩu cho Client (ứng dụng).
- Client sử dụng thông tin này để lấy Access Token từ Authorization Server.
- Từ OAuth 2.1, luồng này không còn được khuyến khích sử dụng nữa do các rủi ro bảo mật liên quan đến việc chia sẻ thông tin đăng nhập trực tiếp với Client.

```bashPOST /token
POST /oauth/token
Content-Type: application/x-www-form-urlencoded 
grant_type=password
username=anna
password=ABC123xyz
scope=read write
```
### 5. Refresh Token Grant
- Luồng này cho phép Client lấy Access Token mới bằng cách sử dụng Refresh Token khi Access Token hết hạn.
- Điều này giúp duy trì phiên làm việc của người dùng mà không cần họ phải đăng nhập lại. 
Tăng bảo mật bằng cách cho Access Token có thời hạn ngắn còn Refresh Token có thời hạn dài hơn.

```bashPOST /token
POST /oauth/token
Content-Type: application/x-www-form-urlencoded
grant_type=refresh_token
refresh_token=def456UVW
client_id=YOUR_CLIENT_ID
client_secret=YOUR_CLIENT_SECRET
```


## References
- [OAuth 2.0](https://oauth.net/2/)
- [What is OAuth 2.0?](https://auth0.com/intro-to-iam/what-is-oauth-2)
- [OAuth 2.0 Authorization Framework](https://auth0.com/docs/authenticate/protocols/oauth)
- [API Gateway OAuth 2.0 Authentication Flows](https://docs.oracle.com/cd/E50612_01/doc.11122/oauth_guide/content/oauth_flows.html)