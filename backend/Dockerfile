
FROM golang:1.22.1-alpine
ENV GO111MODULE=on

RUN mkdir /app
ADD . /app
WORKDIR /app
RUN apk add git

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .

RUN go build -o /main .
EXPOSE 8080
CMD ["/main"]