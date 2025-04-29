<?php
/**
 * Plugin Name:       AMJL Custom Blocks
 * Description:       Eigene Gutenberg-Blöcke (Slider, Icons, Buttons).
 * Version:           1.0.0
 * Author:            Jannes Lüdtke
 */

// Custom blocks mit block.json registrieren
function amjl_register_custom_blocks() {
    register_block_type( __DIR__ . '/blocks/swiper' );
    register_block_type( __DIR__ . '/blocks/swiper-slide' );
    register_block_type( __DIR__ . '/blocks/icon' );
    register_block_type( __DIR__ . '/blocks/buttons' );
    register_block_type( __DIR__ . '/blocks/button-child' );
}
add_action( 'init', 'amjl_register_custom_blocks' );
