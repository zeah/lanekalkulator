<?php
/*
Plugin Name: EM Lånekalkulator
Description: Lånekalkulator
Version: 0.0.0.2
*/

defined( 'ABSPATH' ) or die( 'Blank Space' );

// constant for plugin location
define( 'LANKALKULATOR_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once 'inc/emlk-shortcode.php';

function init_emlankalkulator() {
	Emlk_Shortcode::get_instance();
}

add_action('plugins_loaded', 'init_emlankalkulator');
