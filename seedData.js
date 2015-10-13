'use strict';
/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

Refer to the q documentation for why and how q.invoke is used.

*/

let mongoose = require('mongoose');
let connectToDb = require('./server/db');
let User = mongoose.model('User');
let Article = mongoose.model('Article');
let q = require('q');
let chalk = require('chalk');

let randomize = (arr) => {
    return Math.floor(Math.random() * arr.length);
}

let getCurrentUserData = () => {
    return q.ninvoke(User, 'find', {});
};

let seedUsers = () => {

    let users = [
        {
            username: 'test123',
            email: 'test@test.com',
            password: '123',
            role: 'admin',
            profile: {
              name: 'Tester',
            },
        },
        {
            username: 'qwe123',
            email: 'qwe@qwe.com',
            password: '123',
            role: 'admin',
            profile: {
              name: 'Qwerty-Man'
            },
        },
        {
            username: 'asd123',
            email: 'asd@asd.com',
            password: '123',
            role: 'user',
            profile: {
              name: 'Hollow Tapes'
            },
        },
        {
            username: 'zxc123',
            email: 'zxc@zxc.com',
            password: '123',
            role: 'user',
            profile: {
              name: 'Random Letters'
            },
        }
    ];

    return q.invoke(User, 'create', users);
};

let seedArticles = (users) => {
    let articles = [
        {
          title: 'Intro to ReactJS',
          author: users[randomize(users)]._id,
          content: markdown_text,
          tags: ['react', 'es6', 'webpack']
        },
        {
          title: 'Intro to Angular2',
          author: users[randomize(users)]._id,
          content: markdown_text,
          tags: ['angular', 'es6', 'angular2']
        },
        {
          title: 'AngularJS Fundamentals',
          author: users[randomize(users)]._id,
          content: markdown_text,
          tags: ['angular', 'es6', 'webpack']
        },
        {
          title: 'Advanced Directives in AngularJS',
          author: users[randomize(users)]._id,
          content: markdown_text,
          tags: ['angular', 'es6', 'directives']
        },
        {
          title: 'AngularJS Authentication',
          author: users[randomize(users)]._id,
          content: markdown_text,
          tags: ['react', 'es6', 'webpack']
        }
    ];

    return q.invoke(Article, 'create', articles);
}

connectToDb.then(() => {
    getCurrentUserData().then((users) => {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(() => {
        return getCurrentUserData();
    }).then((users) => {
        return seedArticles(users);
    }).then(() => {
        return q.ninvoke(Article, 'find', {}).then((articleArr) => {
            let promiseArr = articleArr.map((article) => {
                User.findById(article.author).exec().then((user) => {
                    user.projects.push(article._id);
                    user.save().exec();
                });
            });
            return q.all(promiseArr);
        });

    }).then(() => {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    });
}).catch((err) => {
    console.error(err);
    process.kill(1);
});


let markdown_text = `# Ut fugerat terrigenam sonent resoluta in nutrix

## Spectat Hesperien et nunc

Lorem markdownum parenti ut matris. Et retracto, non aniles partes, limite nos
peto et terrenaque ululare et illam. Magnique eodem, nec dicere suam nullo comas
adituque ut fugam ipsa sorore, ab. Damno et raro fuerunt nefanda Iovique capro
tendentem terreat sucis australem manum splendidaque pectore.

    alert(shareware_dv_interpreter.whitelistOlapHard.redundancy_truncate_denial(
            rpm_gopher_middleware), camelcase(10, dvrNtfs) +
            supercomputerPdfWord.cybersquatterUri(throughput_cdn_session, 5,
            mips), 2);
    let firmwareMegapixel = 31;
    desktop = hard_port_refresh;
    if (disk_dvi(18, pup_hit_plug * viral_osd_cgi, 5)) {
        directxCopyRuntime.jsf += ocr + viral_meta_permalink;
        columnTcp = text_repeater_key(fsb_design_unmount);
        file_bus_cyberbullying = hypertext_icio(mirrored_print_data);
    } else {
        station_compile(menu_barcraft_perl);
        scraping = htmlProcessorWi.typeSystem.page(veronicaSequenceDriver(62396,
                45));
        exbibytePortBridge(-5, port_sync);
    }

## Petere Nilus

Haec postquam caesarumque suus conantesque lucis; [nebula unum
solum](http://www.uselessaccount.com/), et fuerunt. Portus pervia res viscera
pater evehor conplevit similes graviore, causa. Nox triplici puppis Balearica
supremum servet relinquitur costumque tandem prius cursus; accipit voce aetas.
Commota quae potest levior voluisti obsceno votaque: frigida: fronti primum.

## Fit urget me vivit pudoris prodet haurire

Tela pendentibus sine, iamdudum deos positas infelix, numen circumfert ut fugit
os Quirini perque iacent! Facto et et meis madidisque adeste! *Poterat fera*,
tam viribus crinem. Nec dedit desint meritam neque. Quam enim *volvitur et
Aonides* insequitur intus tumulandus viro reverentia et Athon Delphos stivave
retexite.

## Est qua et fumo caesaries inmunibus

Consistere corpore **videt Sardibus**, rudi obductos de armis [sordidus
palustribus](http://www.youtube.com/watch?v=MghiBW3r65M) pudicos. Novam palmis
adii in nimium umeris, saecula difficilem solo nubilis ea perque cum; aere urbs,
tinnulaque. Est nisi gentem pendens conveniunt ardua, sum utve procul vitam
incepto tenebas consolor tellus, altae.

1. Prima refugis quorum umenti Hecate
2. Facit plectrumque tincta quod aliquem quam
3. Mater arboris
4. Et prima senilem sanguine

Troiana per vincla *ne* duae mandarat, animi cuncta **in reserato passu**
Fluctibus Agenore monet? Nec conatur innata lavere; longa nullos, dies deum
siccis incepto; vesper misit.`;
