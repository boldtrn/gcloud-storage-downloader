const { Storage } = require('@google-cloud/storage');

const gCloudDownload = {

    bucketName: '',
    storage: null,

    init: function (projectId, keyFilename, bucketName) {
        this.bucketName = bucketName;
        this.storage = new Storage({ projectId, keyFilename });
    },

    /**
     * Find files that contain the needle.
     * @param {*} needle string that should be searched for
     */
    findFilesThatContain: async function (needle) {
        let foundFiles = [];
        const [files] = await this.storage.bucket(this.bucketName).getFiles();
        files.forEach(file => {
            const fileName = file.name;
            if (fileName && fileName.includes(needle)){
                foundFiles.push(file);
            }
        });
        
        return foundFiles;
    },

    /**
     * Download the file
     * 
     * @param {*} remoteFile the name of the file on gCloud
     * @param {*} destinationFile the path and name of the file where it should be stored locally, e.g. "./file.txt"
     */
    downloadFile: async function (remoteFile, destinationFile) {
        let options = {
            destination: destinationFile,
        };

        await this.storage
            .bucket(this.bucketName)
            .file(remoteFile)
            .download(options);
    }
}

module.exports = gCloudDownload;