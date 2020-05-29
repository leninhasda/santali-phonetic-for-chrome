ZIP_NAME = santali-phonetic.zip

zip: #clean
	@@echo "Creating the new ZIP..."
	@@rm -f ${ZIP_NAME}
	@@mkdir -p santali-phonetic
	@@cp ./src/background.html ./santali-phonetic
	# @@cp ./src/options.html ./santali-phonetic
	@@cp ./src/manifest.json ./santali-phonetic
	@@cp ./dist/background.js ./santali-phonetic
	@@cp ./dist/content.js ./santali-phonetic
	@@cp -R ./src/images ./santali-phonetic
	@@zip ${ZIP_NAME} -qr9 ./santali-phonetic
	@@echo "The new ZIP file has been created"
	@@echo ${ZIP_NAME}

build:
	npm run start

dep:
	npm install
	
clean:
	@@echo "Removing the old ZIP..."
	@@rm -f ${ZIP_NAME}
	@@echo "Removing dist/*..."
	@@rm -f ./dist/*
	@@echo "Done!"
