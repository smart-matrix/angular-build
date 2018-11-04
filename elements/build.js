const fs = require('fs-extra');
const concat = require('concat');

(async function build(project) {
    const files = [
        `./dist/${project}-build/runtime.js`,
        `./dist/${project}-build/polyfills.js`,
        `./dist/${project}-build/scripts.js`,
        `./dist/${project}-build/main.js`,
    ];

    if (await fs.exists(`dist/${project}`))
        await fs.remove(`dist/${project}`);

    await fs.ensureDir(`dist/${project}`);

    await concat(files, `dist/${project}/${project}.js`);

    if (await fs.exists(`./dist/${project}-build/styles.css`))
        await fs.copyFile(`./dist/${project}-build/styles.css`, `dist/${project}/styles.css`);

    if (await fs.exists(`./dist/${project}-build/assets/`))
        await fs.copy(`./dist/${project}-build/assets/`, `dist/${project}/assets/` ) ;
})(process.argv[2])