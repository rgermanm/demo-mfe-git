#!/bin/bash

APP_VERSION="1.0.0"

AMBIENTE="$1"

ls "$JENKINS_HOME"/jobs/"$PROMOTED_JOB_NAME"/builds/"$PROMOTED_NUMBER"/archive/docker/build/az-voc-front*.zip
cp -f "$JENKINS_HOME"/jobs/"$PROMOTED_JOB_NAME"/builds/"$PROMOTED_NUMBER"/archive/docker/build/az-voc-front*.zip  "$JENKINS_HOME"/workspace/"$PROMOTED_JOB_NAME"/docker/fe/az-voc-front.zip
ls "$JENKINS_HOME"/workspace/"$PROMOTED_JOB_NAME"/docker/fe/az-voc-front.zip
cd "$JENKINS_HOME"/workspace/"$PROMOTED_JOB_NAME"/docker/fe
echo "Ambiente: ${AMBIENTE}"
docker build -t docker-registry.allianz.com.ar/az-voc-front:${AMBIENTE} .
docker push docker-registry.allianz.com.ar/az-voc-front:${AMBIENTE}
