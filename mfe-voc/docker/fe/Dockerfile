FROM nginx:1.14.0

USER root

RUN apt-get update && apt-get install -y

RUN apt-get -y install zip

RUN apt-get -y install unzip

COPY default.conf /etc/nginx/conf.d/default.conf

ADD az-voc-front.zip /usr/share/nginx/az-voc-front.zip

RUN unzip /usr/share/nginx/az-voc-front.zip -d /usr/share/nginx/

RUN rm /usr/share/nginx/az-voc-front.zip

RUN mv /usr/share/nginx/az-voc-front* /usr/share/nginx/az-voc-front

RUN mv /usr/share/nginx/az-voc-front/* /usr/share/nginx/html/

RUN rmdir /usr/share/nginx/az-voc-front

ADD entrypoint.sh /

RUN chmod 755 /entrypoint.sh

CMD ["/entrypoint.sh"]

