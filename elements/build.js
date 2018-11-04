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

    if (await fs.exists(`./package.json`))
        await fs.copyFile(`./package.json`, `dist/${project}/package.json`);

    if (await fs.exists(`./LICENSE`))
        await fs.copyFile(`./LICENSE`, `dist/${project}/LICENSE`);

    if (await fs.exists(`./README.md`))
        await fs.copyFile(`./README.md`, `dist/${project}/README.md`);

    if (await fs.exists(`./dist/${project}-build/styles.css`))
        await fs.copyFile(`./dist/${project}-build/styles.css`, `dist/${project}/${project}.css`);

    if (await fs.exists(`./dist/${project}-build/index.html`))
        await fs.copyFile(`./dist/${project}-build/index.html`, `dist/${project}/${project}-demo.html`);

    if (await fs.exists(`./dist/${project}-build/assets/`))
        await fs.copy(`./dist/${project}-build/assets/`, `dist/${project}/assets/` ) ;
})(process.argv[2])