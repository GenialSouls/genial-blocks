<?php
/**
 * Deactivation hooks.
 *
 * @package GenialSouls\GenialBlocks
 */

namespace GenialSouls\GenialBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handles deactivation cleanup.
 */
class Deactivator {
	/**
	 * Performs deactivation cleanup.
	 *
	 * @return void
	 */
	public static function deactivate() {
		// No persistent state is created by this plugin.
	}
}
