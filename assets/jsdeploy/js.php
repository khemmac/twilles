<?php

require 'jsmin.php';

function checkCanGzip(){
    if (array_key_exists('HTTP_ACCEPT_ENCODING', $_SERVER)) {
        if (strpos($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip') !== false) return "gzip";
        if (strpos($_SERVER['HTTP_ACCEPT_ENCODING'], 'x-gzip') !== false) return "x-gzip";
    }
    return false;
}

function gzDocOut($contents, $level=6){
    $return = array();
    $return[] = "\x1f\x8b\x08\x00\x00\x00\x00\x00";
    $size = strlen($contents);
    $crc = crc32($contents);
    $contents = gzcompress($contents,$level);
    $contents = substr($contents, 0, strlen($contents) - 4);
    $return[] = $contents;
    $return[] = pack('V',$crc);
    $return[] = pack('V',$size);
    return implode(null, $return);
}

function min_to_file($source_path, $out_file){
	if(preg_match('/assets\/ext\/ux/', $source_path)){
		$files = array(
			"$source_path/SWFUpload.js",

			"$source_path/ajax/Simlet.js",
			"$source_path/ajax/DataSimlet.js",
			"$source_path/ajax/JsonSimlet.js",
			"$source_path/ajax/SimXhr.js",
			"$source_path/ajax/SimManager.js",

			"$source_path/grid/filter/Filter.js",
			"$source_path/grid/filter/BooleanFilter.js",
			"$source_path/grid/filter/ListFilter.js",
			"$source_path/grid/filter/NumericFilter.js",
			"$source_path/grid/filter/DateFilter.js",
			"$source_path/grid/filter/DateTimeFilter.js",
			"$source_path/grid/filter/StringFilter.js",

			"$source_path/grid/FiltersFeature.js",

			"$source_path/grid/menu/ListMenu.js",
			"$source_path/grid/menu/RangeMenu.js",

			"$source_path/form/NumericField.js"
		);
		foreach($files as $file) {
			echo $file.'<br />';
			$fh = fopen($file, "r");
			$fdata = "";
			while (($b = fgets($fh)) !== false) {
			    $fdata .= $b;
			}
	        $buffer[] = $fdata;
			fclose($fh);
		}
	}else{
		$ite = new RecursiveDirectoryIterator($source_path);
		foreach(new RecursiveIteratorIterator($ite) as $file => $fileInfo) {
			echo $file.'<br />';
		    $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
		    if ($extension == 'js') {
		        $f = $fileInfo->openFile('r');
		        $fdata = "";
				while ( ! $f->eof()) {
					$fdata .= $f->fgets();
		        }
		        $buffer[] = $fdata;
		    }
		}
	}


	$output = JSMin::minify(implode(";\n", $buffer));
	//$output = implode(";\n", $buffer);

	//echo "OUTPUT FILE: \"$out_file\"<br />";

	$fh = fopen($out_file, 'w');
	$w_result = fwrite($fh, $output);
	if($w_result)
		echo "Write file: \"$out_file\" SUCCESS.<br />";
	else
		echo "Write file: \"$out_file\" FAILURE.<br />";
}

/////////////////////////////////////////
// set file below

$ext_ux_path = realpath('../ext/ux');
$ext_ux_out_file = realpath('').'/ext-ux.js';

min_to_file($ext_ux_path, $ext_ux_out_file);

$ext_base_path = realpath('../base_ext');
$ext_base_out_file = realpath('').'/all-base.js';

min_to_file($ext_base_path, $ext_base_out_file);

$js_path = realpath('../js');
$js_out_file = realpath('').'/all-js.js';

min_to_file($js_path, $js_out_file);
return;

/*
//$ite = new RecursiveDirectoryIterator(dirname(__FILE__));
$js_path = '/home/user/data/www/php_www/AI-Account/assets/js';
//$js_path = '/home/user/data/www/php_www/AI-Account/assets/ext_base';
//$js_path = '/home/user/data/www/php_www/twiles_admin/assets/js';
//$js_path = '/home/user/data/www/php_www/twiles_admin/assets/base_ext';
$ite = new RecursiveDirectoryIterator($js_path);
foreach(new RecursiveIteratorIterator($ite) as $file => $fileInfo) {
    $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    if ($extension == 'js') {
        $f = $fileInfo->openFile('r');
        $fdata = "";
        while ( ! $f->eof()) {
            $fdata .= $f->fgets();
        }
        $buffer[] = $fdata;
    }
}

$output = JSMin::minify(implode(";\n", $buffer));

header("Content-type: application/x-javascript; charset: UTF-8");
$forceGz    = filter_input(INPUT_GET, 'gz', FILTER_SANITIZE_STRING);
$forcePlain = filter_input(INPUT_GET, 'plain', FILTER_SANITIZE_STRING);

$encoding = checkCanGzip();
if ($forceGz) {
    header("Content-Encoding: {$encoding}");
    echo gzDocOut($output);
} elseif ($forcePlain) {
    echo $output;
} else {
    if ($encoding){
        header("Content-Encoding: {$encoding}");
        echo GzDocOut($output);
    } else {
        echo $output;
    }
}
*/
