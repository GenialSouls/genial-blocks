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
		$this->loader->add_filter( 'block_categories_all', $this, 'register_block_category' );
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

	/**
	 * Adds the dedicated block inserter category.
	 *
	 * @param array<int, array<string, string>> $categories Existing categories.
	 * @return array<int, array<string, string>>
	 */
	public function register_block_category( $categories ) {
		foreach ( $categories as $category ) {
			if ( isset( $category['slug'] ) && 'genial-blocks' === $category['slug'] ) {
				return $categories;
			}
		}

		array_unshift(
			$categories,
			array(
				'slug'  => 'genial-blocks',
				'title' => __( 'Genial Blocks', 'genial-blocks' ),
			)
		);

		return $categories;
	}
}
