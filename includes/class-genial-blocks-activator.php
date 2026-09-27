<?php
/**
 * Activation hooks.
 *
 * @package GenialSouls\GenialBlocks
 */

namespace GenialSouls\GenialBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handles activation checks.
 */
class Activator {
	/**
	 * Performs activation checks.
	 *
	 * @return void
	 */
	public static function activate() {
		if ( version_compare( PHP_VERSION, '7.4', '<' ) ) {
			deactivate_plugins( plugin_basename( GENIAL_BLOCKS_FILE ) );
			wp_die( esc_html__( 'Genial Blocks requires PHP 7.4 or newer.', 'genial-blocks' ) );
		}
	}
}
