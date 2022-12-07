FROM golang:alpine AS build

RUN apk add git

WORKDIR /src

COPY go.* ./
RUN go mod download

COPY . .
RUN go build -o ./http-server ./main.go

FROM alpine:edge

COPY --from=build /src/http-server /sbin/http-server
COPY --from=build /src/config /sbin/config
EXPOSE 80

ENTRYPOINT ["/sbin/http-server"]