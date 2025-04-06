<?php
/**
 * Plugin Name:       AMJL Custom Blocks
 * Description:       Eigene Gutenberg-Blöcke (Slider, Icons, Formular).
 * Version:           1.0.0
 * Author:            Dein Name
 */

// Lokale Swiper Datei im Block Editor einbinden
function amjl_register_block_assets() {
    // Swiper CSS für Editor laden
    wp_enqueue_style(
        'amjl-swiper-editor-style',
        plugins_url( 'css/swiper-bundle.min.css', __FILE__ ),
        array(),
        '11.1.0' // Version von Swiper anpassen, wenn nötig
    );

    // Swiper JS für Editor laden
    wp_enqueue_script(
        'amjl-swiper-editor-script',
        plugins_url( 'js/swiper-bundle.min.js', __FILE__ ),
        array(),
        '11.1.0',
        true
    );
}
add_action( 'enqueue_block_editor_assets', 'amjl_register_block_assets' );

// Swiper Block aus block.json registrieren
function amjl_register_swiper_block() {
    register_block_type( __DIR__ . '/blocks/swiper' );
}
add_action( 'init', 'amjl_register_swiper_block' );
