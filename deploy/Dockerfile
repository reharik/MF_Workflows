FROM mf/nodebox

# Maintainer
MAINTAINER Raif Harik <reharik@gmail.com>

# set WORKDIR
WORKDIR /opt/app/current

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
COPY /app /opt/app/current

ADD /app/package.json /opt/app/current/package.json
ADD /app/.npmrc /opt/app/current/.npmrc
RUN  npm install
RUN npm install -g nodemon

# Entrypoint to docker shell
ENTRYPOINT ["docker-shell"]

#this is the flag that tells the docker-shell what mode to execute
# Startup commands
CMD ["-r"]

# Add shell script for starting container
ADD ./docker-shell.sh /usr/bin/docker-shell
RUN chmod +x /usr/bin/docker-shell


