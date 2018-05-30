<?php 

defined( 'ABSPATH' ) or die( 'Blank Space' );

final class Emlk_Shortcode {
	/* SINGLETON */
	private static $instance = null;
	private $desktop = LANKALKULATOR_PLUGIN_URL.'css/em-lanekalkulator.css?ver=0.0.3';
	private $mobile = LANKALKULATOR_PLUGIN_URL.'css/em-lanekalkulator-mobile.css';

	public static function get_instance() {
		if (self::$instance === null) self::$instance = new self();

		return self::$instance;
	}

	private function __construct() {
		$this->wp_hooks();
	}

	private function wp_hooks() {

		if (! shortcode_exists('kalkulator'))   add_shortcode('kalkulator', array($this, 'shortcode'));
		else 									add_shortcode('em-lanekalkulator', array($this, 'shortcode'));
	
	}

	public function shortcode($atts, $content = null) {
		add_action('wp_footer', array($this, 'add_footer'));

		$float = false;
		if (isset($atts['float']))
			switch ($atts['float']) {
				case 'left': $float = ' float: left;'; break;
				case 'right': $float = ' float: right;'; break;
			}

		$width = false;
		if (isset($atts['width'])) $width = intval($atts['width']) / 10;

		$html = '<div class="em-lanekalkulator" style="opacity: 0;'.($float ? $float : '').($width ? ' width: '.$width.'rem' : '').'"></div>'; 

		return $html;
	}

	public function add_footer() {
		echo '<script defer>
				(function() {
					var o = document.createElement("link");
					o.classList.add("emcasino-css");
					o.setAttribute("rel", "stylesheet");
					o.setAttribute("href", "'.esc_html($this->desktop).'");
					o.setAttribute("media", "(min-width: 1025px)");
					document.head.appendChild(o);

					var m = document.createElement("link");
					m.classList.add("emcasino-css-mobile");
					m.setAttribute("rel", "stylesheet");
					m.setAttribute("href", "'.esc_html($this->mobile).'");
					m.setAttribute("media", "(max-width: 1024px)");
					document.head.appendChild(m);

				})();
			  </script>';


		echo '<script type="text/javascript" src="'.LANKALKULATOR_PLUGIN_URL.'js/em-lanekalkulator.js?ver=0.0.1"></script>';
	}
}