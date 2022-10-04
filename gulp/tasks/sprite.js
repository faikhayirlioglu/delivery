import svgSprite from 'gulp-svg-sprite';

export const spriteMono = () => {
    return app.gulp.src(`${app.path.src.iconsMono}`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG Mono",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: '../sprites/sprite-mono.svg',
                },
            },
            shape: {
                transform: [
                    {
                        svgo: {
                            js2svg: {pretty: true},
                            plugins: [
                                {
                                    removeAttrs: {
                                        attrs: ['class', 'data-name', 'fill.*', 'stroke.*'],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        }))
        .pipe(app.gulp.dest(`${app.path.build.images}`));
}

export const spriteColor = () => {
    return app.gulp.src(`${app.path.src.iconsColor}`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG Color",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: '../sprites/sprite-color.svg',
                },
            },
            shape: {
                transform: [
                    {
                        svgo: {
                            js2svg: {pretty: true},
                            plugins: [
                                {
                                    removeAttrs: {
                                        attrs: ['class', 'data-name'],
                                    },
                                },
                                {
                                    removeUselessStrokeAndFill: false,
                                },
                                {
                                    inlineStyles: true,
                                },
                            ],
                        },
                    },
                ],
            },
        }))
        .pipe(app.gulp.dest(`${app.path.build.images}`));
}
