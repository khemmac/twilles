<?php

class Image {

	public function merge($imgs, $width=400, $height=400){
		$imgs_exist = array();
		// check file exist
		for($i=0;$i<count($imgs);$i++){
			if(file_exists($imgs[$i]))
				array_push($imgs_exist, $imgs[$i]);
		}

		// set base image
		// set background color to white
		$final = imagecreatetruecolor($width, $height);
		$backgroundColor = imagecolorallocate($final, 255, 255, 255);
		imagefill($final, 0, 0, $backgroundColor);

		foreach ($imgs_exist as $index => $src_image_path)
		{
			//list ($x, $y) = indexToCoords($index);
			$part_img = imagecreatefrompng($src_image_path);

			imagecopy($final, $part_img, 0, 0, 0, 0, $width, $height);
			imagedestroy($part_img);
		}
		return $final;
	}

	public function save($imbObj, $destPath){
		imagejpeg($imbObj, $destPath, 85);
		imagedestroy($imbObj);
	}

	public function resize($source_image_path, $thumbnail_image_path, $max_width = 90, $max_height = 90){
		list($source_image_width, $source_image_height, $source_image_type) = getimagesize($source_image_path);
	    switch ($source_image_type) {
	        case IMAGETYPE_GIF:
	            $source_gd_image = imagecreatefromgif($source_image_path);
	            break;
	        case IMAGETYPE_JPEG:
	            $source_gd_image = imagecreatefromjpeg($source_image_path);
	            break;
	        case IMAGETYPE_PNG:
	            $source_gd_image = imagecreatefrompng($source_image_path);
	            break;
	    }
	    if ($source_gd_image === false) {
	        return false;
	    }
	    $source_aspect_ratio = $source_image_width / $source_image_height;
	    $thumbnail_aspect_ratio = $max_width / $max_height;
	    if ($source_image_width <= $max_width && $source_image_height <= $max_height) {
	        $thumbnail_image_width = $source_image_width;
	        $thumbnail_image_height = $source_image_height;
	    } elseif ($thumbnail_aspect_ratio > $source_aspect_ratio) {
	        $thumbnail_image_width = (int) ($max_height * $source_aspect_ratio);
	        $thumbnail_image_height = $max_height;
	    } else {
	        $thumbnail_image_width = $max_width;
	        $thumbnail_image_height = (int) ($max_width / $source_aspect_ratio);
	    }
	    $thumbnail_gd_image = imagecreatetruecolor($thumbnail_image_width, $thumbnail_image_height);
	    imagecopyresampled($thumbnail_gd_image, $source_gd_image, 0, 0, 0, 0, $thumbnail_image_width, $thumbnail_image_height, $source_image_width, $source_image_height);
	    imagejpeg($thumbnail_gd_image, $thumbnail_image_path, 85);
	    imagedestroy($source_gd_image);
		imagedestroy($thumbnail_gd_image);
	    return true;
	}

}