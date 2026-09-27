<?php
/**
 * Main plugin orchestration.
 *
 * @package GenialSouls\GenialBlocks
 */

namespace GenialSouls\GenialBlocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main plugin runtime.
 */
class Plugin {
	/**
	 * Hook manager.
	 *
	 * @var Loader
	 */
	private $loader;

	/**
	 * Creates the plugin runtime.
	 */
	public function __construct() {
		$this->loader = new Loader();
		$this->loader->add_action( 'init', $this, 'register_blocks' );
	}

	/**
	 * Registers plugin hooks.
	 *
	 * @return void
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * Registers compiled block metadata.
	 *
	 * @return void
	 */
	public function register_blocks() {
		$block_paths = glob( GENIAL_BLOCKS_DIR . 'build/blocks/*', GLOB_ONLYDIR );
		foreach ( $block_paths as $block_path ) {
			if ( is_file( $block_path . '/block.json' ) ) {
				register_block_type( $block_path );
			}
		}
	}
}
