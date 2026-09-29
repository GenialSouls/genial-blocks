<?php
/**
 * Plugin Name: Genial Blocks
 * Description: Native, accessible WordPress block editor blocks from GenialSouls.
 * Version: 0.2.0
 * Author: GenialSouls
 * Author URI: https://genialsouls.com/
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: genial-blocks
 * Domain Path: /languages
 * Requires at least: 6.8
 * Requires PHP: 7.4
 *
 * @package GenialSouls\GenialBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'GENIAL_BLOCKS_VERSION', '0.2.0' );
define( 'GENIAL_BLOCKS_FILE', __FILE__ );
define( 'GENIAL_BLOCKS_DIR', plugin_dir_path( __FILE__ ) );
define( 'GENIAL_BLOCKS_URL', plugin_dir_url( __FILE__ ) );

require_once GENIAL_BLOCKS_DIR . 'includes/class-genial-blocks-loader.php';
require_once GENIAL_BLOCKS_DIR . 'includes/class-genial-blocks-activator.php';
require_once GENIAL_BLOCKS_DIR . 'includes/class-genial-blocks-deactivator.php';
require_once GENIAL_BLOCKS_DIR . 'includes/class-genial-blocks.php';

register_activation_hook( __FILE__, array( 'GenialSouls\\GenialBlocks\\Activator', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'GenialSouls\\GenialBlocks\\Deactivator', 'deactivate' ) );

/**
 * Starts the plugin.
 *
 * @return void
 */
function genial_blocks_run() {
	$plugin = new GenialSouls\GenialBlocks\Plugin();
	$plugin->run();
}

genial_blocks_run();
