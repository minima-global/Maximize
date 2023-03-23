version=$(node getVersion.js)

cd build && zip -r maximize-${version}.mds.zip . && mv maximize-${version}.mds.zip ../
