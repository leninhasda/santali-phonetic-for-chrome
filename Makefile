ZIP_NAME = santali-phonetic.zip
DEST_DIR = santali-phonetic

zip: build
	@@echo "Creating the new ZIP..."
	@@rm -f ${ZIP_NAME}
	@@zip ${ZIP_NAME} -qr9 ./${DEST_DIR}
	@@echo "The new ZIP file has been created"
	@@echo ${ZIP_NAME}

dep:
	npm install

build: clean
	@@echo "Making clean build..."
	@@npm run build
	@@mkdir -p santali-phonetic
	@@cp ./src/options.html ./${DEST_DIR}
	@@cp ./src/manifest.json ./${DEST_DIR}
	@@cp -R ./src/images ./${DEST_DIR}

clean:
	@@echo "Removing the old ZIP..."
	@@rm -f ${ZIP_NAME}
	@@echo "Removing DEST_DIR/*..."
	@@rm -rf ./${DEST_DIR}/*
	@@echo "Cleaning done!"
