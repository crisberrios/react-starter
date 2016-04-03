var dest = './build';
var src = './src';

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },
  sass: {
    src: src + '/sass/**/*.{sass,scss}',
    dest: dest + '/css',
    settings: {
      indentedSyntax: false, // Enable .sass syntax!
      imagePath: 'images' // Used by the image-url helper
    }
  },
  images: {
    src: src + '/images/**',
    dest: dest + '/images'
  },
  pubfiles: {
    src: src + '/public/**',
    dest: dest
  },
  markup: {
    src: src + '/htdocs/**',
    dest: dest
  },
  jade: {
    src: src + '/jade/*.jade',
    dest: dest
  },
  iconFonts: {
    name: 'Gulp Starter Icons',
    src: src + '/icons/*.svg',
    dest: dest + '/fonts',
    sassDest: src + '/sass',
    template: './gulp/tasks/iconFont/template.sass.swig',
    sassOutputName: '_icons.sass',
    fontPath: 'fonts',
    className: 'icon',
    options: {
      fontName: 'Post-Creator-Icons',
      appendCodepoints: true,
      normalize: false
    }
  },
  browserify: {
      src: src,
      srcFile: 'app.jsx',
      outputDir: dest,
      outputFile: 'bundle.js'
  },
  production: {
    cssSrc: dest + '/css/*.css',
    jsSrc: dest + '/css/*.js',
    dest: dest + '/css'
  }
};
