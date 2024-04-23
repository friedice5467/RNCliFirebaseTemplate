const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, searchRegex, replaceStr) {
    let contents = fs.readFileSync(filePath, 'utf8');
    let newContents = contents.replace(searchRegex, replaceStr);
    
    // Special handling for XML-like files to preserve case structure, common in plist files
    if (filePath.endsWith('.plist')) {
        newContents = newContents.replace(/(<string>[^<]*?)AiRecipeRecommender([^<]*?<\/string>)/gi, (match, p1, p2) => {
            return `${p1}TemplateName${p2}`;
        });
    }

    // Special handling for Podfile to prevent breaking CocoaPods syntax
    if (filePath.toLowerCase().includes('podfile')) {
        newContents = newContents.replace(/pod ['"]AiRecipeRecommender/gi, "pod 'TemplateName");
    }

    // Handling for Xcode project files (could be risky, be sure to backup before running)
    if (filePath.endsWith('.pbxproj')) {
        newContents = newContents.replace(/AiRecipeRecommender/g, 'TemplateName');
    }

    if (contents !== newContents) {
        fs.writeFileSync(filePath, newContents);
        console.log(`Updated: ${filePath}`);
    }
}

function fromDir(startPath, filter, callback) {
    if (!fs.existsSync(startPath)) {
        console.log("Directory not found: ", startPath);
        return;
    }

    const files = fs.readdirSync(startPath);
    for (let file of files) {
        const filename = path.join(startPath, file);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter, callback); // Recurse into subdirectories
        } else if (filter.test(filename)) callback(filename);
    }
}

// Customize the file types you want to search through
const fileTypes = /\.(js|jsx|ts|tsx|java|xml|gradle|json|html|css|kt|plist|pod|swift|m|pbxproj)$/i;

fromDir('.', fileTypes, function (filename) {
    const searchRegex = /AiRecipeRecommender/gi; // "i" for case insensitive
    replaceInFile(filename, searchRegex, 'TemplateName');
});
