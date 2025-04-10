<?php
/**
 * Plugin Name:       AMJL Custom Blocks
 * Description:       Eigene Gutenberg-Blöcke (Slider, Icons, Formular).
 * Version:           1.0.0
 * Author:            Dein Name
 */

// Swiper Block aus block.json registrieren
function amjl_register_swiper_block() {
    register_block_type( __DIR__ . '/blocks/swiper' );
    register_block_type( __DIR__ . '/blocks/swiper-slide' );
    register_block_type( __DIR__ . '/blocks/icon' );
}
add_action( 'init', 'amjl_register_swiper_block' );
