# build.sh para az-voc-front

VERSION="$1"
NEXT_VERSION="$2"
GIT_USER="$3"
GIT_PASS="$4"

echo "VERSION: ${VERSION}"
echo "NEXT_VERSION: ${NEXT_VERSION}"
echo "GIT_USER: ${GIT_USER}"

#Si la variable workspace no existe, es q no esta corriendo en jenkins
#entonces le pongo el path correspondiente /az-voc-front

if [[ -z $WORKSPACE ]]; then
	echo "No existe variable WORKSPACE corriendo local. Usando /az-voc-front"
	WORKSPACE='/az-voc-front' 
fi

rm -rf ${WORKSPACE}/docker/build/*.zip

cd ${WORKSPACE}/docker/build
docker build -t az-voc-front-builder .
docker run --privileged --security-opt seccomp=unconfined -i -e "VERSION="${VERSION}"" -e "NEXT_VERSION="${NEXT_VERSION}"" -e "GIT_USER="${GIT_USER}"" -e "GIT_PASS="${GIT_PASS}"" -v $WORKSPACE:/az-voc-front -v /var/jenkins_home/.m2:/root/.m2 az-voc-front-builder /bin/bash -c "$(cat ./internal.sh)"
