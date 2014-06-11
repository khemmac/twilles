<?php

class Path {

	// Private
	private function getPath($cfgName, $fn, $prefix = ''){
		$_CI =& get_instance();
		$path = $_CI->config->item($cfgName);

		if(empty($fn))
			return $stock_path;


		if(gettype($fn)=='string')
			$fn = $fn;
		else if(gettype($fn)=='array')
			$fn = implode('-', $fn);

		return $path . $prefix . $fn;
	}
	// End Private

	// THUMBNAIL
	public function getThumbnailsPath($fn){
		return $this->getPath('STOCK_PATH', $fn, 'thumbnails/');
	}
	public function getThumbnailsOutputPath($fn){
		return $this->getPath('THUMBNAIL_OUTPUT_PATH', $fn);
	}

	public function getThumbnailImageTag($dest, $width=90){
		//$url = site_url('backend/order_report/show_thumb_photo?path='.$dest);
		$_CI =& get_instance();
		$base_path = $_CI->config->item('THUMBNAIL_OUTPUT_PATH');
		$base_url = $_CI->config->item('THUMBNAIL_OUTPUT_URL');

		$preg_base_path = preg_replace('/\//', '\/', $base_path);
		$url = preg_replace('/'.$preg_base_path.'/', $base_url, $dest);

		if (!file_exists($dest))
			return '<img src="'.(base_url("images/image-missing.png?v=2")).'" />';
		else
			return '<img src="'.$url.'?v=11" width="'.$width.'" />';
	}
	// END THUMBNAIL

	// FABRIC
	public function getFabricPath($fn){
		return $this->getPath('STOCK_PATH', $fn, 'fabric/');
	}
	public function getFabricOutputPath($fn){
		return $this->getPath('FABRIC_OUTPUT_PATH', $fn);
	}
	public static function getFabricImageTag($dest, $width=70){
		$_CI =& get_instance();
		$base_path = $_CI->config->item('FABRIC_OUTPUT_PATH');
		$base_url = $_CI->config->item('FABRIC_OUTPUT_URL');

		$preg_base_path = preg_replace('/\//', '\/', $base_path);
		$url = preg_replace('/'.$preg_base_path.'/', $base_url, $dest);

		if (!file_exists($dest))
			return '<img src="'.(base_url("images/image-missing.png?v=2")).'" width="'.$width.'" />';
		else
			return '<img src="'.$url.'?v=11" width="'.$width.'" />';
	}
	public static function resizeFabric($source_path, $dest_path){
		$this->resizeImage($source_path, $dest_path, 90, 90);
	}
	// END FABRIC

}