echo "Versionando az-voc-front"
echo "VERSION: ${VERSION}"
echo "NEXT_VERSION: ${NEXT_VERSION}"
echo "GIT_USER: ${GIT_USER}"
echo "GIT VERSION"
git --version
git config --global user.name ${GIT_USER}
git config --global user.email ""${GIT_USER}"@mail.com"
git config --list
cd /az-voc-front
echo "mvn -B -s docker/build/settings.xml -DdevelopmentVersion=${NEXT_VERSION} -DreleaseVersion=${VERSION} -Dresume=false -Dusername=${GIT_USER} -Dpassword=***** release:prepare"
mvn -B -s docker/build/settings.xml -DdevelopmentVersion=${NEXT_VERSION} -DreleaseVersion=${VERSION} -Dresume=false -Dusername=${GIT_USER} -Dpassword=${GIT_PASS} release:prepare
#mvn -B -s docker/build/settings.xml clean package 
mv ./target/az-voc-front-*-Installer.zip /az-voc-front/docker/build/

