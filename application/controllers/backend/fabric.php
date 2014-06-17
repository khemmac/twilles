<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Fabric extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->library('form_validation');

		$this->load->library('PHPExcel');

		$this->load->model('fabric_model', 'fabric');
	}

	public function upload()
	{
		$date = new DateTime();
		$time = $date->getTimestamp();
		$ulPath = FCPATH.'upload_temp/fabric/';
		//echo $ulPath.PHP_EOL;

		$config['upload_path'] = $ulPath;
		$config['file_name'] = $time;
		$config['allowed_types'] = 'xls|xlsx';
		$size_mb = 20; //Max file size allowed in MB
 		$config['max_size'] = $size_mb * 1024; //
 		$config['remove_spaces'] = TRUE;
    	$config['encrypt_name'] = TRUE;


		$this->load->library('upload');
		$this->upload->initialize($config);
		//print_r($_POST);
		//print_r($_FILES);
		$ulResult = $this->upload->do_upload();

		if (!$ulResult)
		{
			echo 'FAILURE';
		}
		else
		{
			$ulData = $this->upload->data();
			$excel_file = $ulData['full_path'];

			echo $excel_file;

			//echo $excel_file;

			// read excel
			//$this->read_excel($excel_file);

			//unlink($excel_file);

			//echo 'SUCCESS';
		}
	}

	public function do_import(){
		$file = X::Request('file');
		// read excel
		$this->read_excel($file);

		unlink($file);
	}

	private function getCellValue($sheet, $cell_pos, $calculated = FALSE){
		//echo $sheet->getCell($cell_pos)->getOldCalculatedValue().PHP_EOL;
		//return $sheet->getCell($cell_pos)->getValue();
		$s = ($calculated)?
				$sheet->getCell($cell_pos)->getCalculatedValue()
				:$sheet->getCell($cell_pos)->getValue();

		return trim($s);
	}

	public function test_read(){
		$file = FCPATH.'upload_temp/fabric/xxxxx.xlsx';
		$file = '/home/user/data/www/php_www/twilles/upload_temp/fabric/522ee7a81312face13401cf2c3d35e66.xlsx';
		$this->read_excel($file);
	}

	private function read_excel($file){
		$output = array();
		$inputFileName = $file;

		$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
		$objReader = PHPExcel_IOFactory::createReader($inputFileType);
		$objPHPExcel = $objReader->load($inputFileName);


		$objSheet = $objPHPExcel->getActiveSheet();//->toArray(null,true,true,true);
		$highestRow = $objSheet->getHighestRow();
		$highestColumn = $objSheet->getHighestColumn();
		$highestColumnIndex = PHPExcel_Cell::columnIndexFromString($highestColumn);

		$product_row_no = 1;
		$unit_row_no = 1;

		$mapper = array(
			'B'=>'fabric_id',
			'C'=>'vendor',
			'D'=>'vendor_code',
			'E'=>'pattern',
			'F'=>'primary_color',
			'G'=>'secondary_color',
			'H'=>'tertiary_color',
			'I'=>'fabric_type',
			'O'=>'texture',
			'P'=>'material',
			'Q'=>'thread_count'
		);

		$result_arr = array();

		for ($row = 1; $row <= $highestRow; ++$row) {

			// define row data
			$r_error = FALSE;
			$r_error_message = array();
			$r_data = array();

			// ข้อมูลจะเริ่มหลังจาก row ที่ 2
			if($row<2) continue;

			$err = array();

			$remark_arr = array();

			$fabric_id = $this->getCellValue($objSheet, 'B'.$row);
			$fabric_name = $this->getCellValue($objSheet, 'C'.$row);
			$vendor_id = $this->getCellValue($objSheet, 'D'.$row);
			$vendor_code = $this->getCellValue($objSheet, 'E'.$row);
			$pattern = $this->getCellValue($objSheet, 'F'.$row);
			$primary_color = $this->getCellValue($objSheet, 'G'.$row);
			$secondary_color = $this->getCellValue($objSheet, 'H'.$row);
			$tertiary_color = $this->getCellValue($objSheet, 'I'.$row);
			$fabric_type = $this->getCellValue($objSheet, 'J'.$row);

			// ADD REMARK
			array_push($remark_arr, 'Wholesale price : '. $this->getCellValue($objSheet, 'K'.$row));
			array_push($remark_arr, 'Mid price : '. $this->getCellValue($objSheet, 'L'.$row));
			array_push($remark_arr, 'Retail price : '. $this->getCellValue($objSheet, 'M'.$row));
			//array_push($remark_arr, 'Buy : '. $this->getCellValue($objSheet, 'N'.$row, TRUE));
			array_push($remark_arr, 'Stock count : '. $this->getCellValue($objSheet, 'O'.$row));

			$texture = $this->getCellValue($objSheet, 'P'.$row);

			// ADD REMARK
			array_push($remark_arr, 'Material : '. $this->getCellValue($objSheet, 'Q'.$row));

			$thread_count = $this->getCellValue($objSheet, 'R'.$row);

			// ADD REMARK
			array_push($remark_arr, 'Construction : '. $this->getCellValue($objSheet, 'S'.$row));

			$finishing = $this->getCellValue($objSheet, 'T'.$row);

			// ADD REMARK
			array_push($remark_arr, 'Fabric name : '. $this->getCellValue($objSheet, 'V'.$row));

			$true_color = $this->getCellValue($objSheet, 'W'.$row);
			$stock_type = $this->getCellValue($objSheet, 'X'.$row);

			if(empty($fabric_id)){
				$r_error = TRUE;
				array_push($r_error_message ,'Fabric code not found.');

				$r_data['error'] = $r_error;
				$r_data['error_message'] = $r_error_message;

				continue;
			}

			// check fabric
			$sql = "SELECT
(SELECT id FROM tbl_fabric WHERE id=?) AS fabric_id
, (SELECT id FROM tbl_supplier WHERE `name`=?) AS supplier_id
, (SELECT id FROM tbl_pattern WHERE `name`=?) AS pattern_id
, (SELECT id FROM tbl_color WHERE `name`=?) AS primary_color_id
, (SELECT id FROM tbl_color WHERE `name`=?) AS secondary_color_id
, (SELECT id FROM tbl_color WHERE `name`=?) AS tertiary_color_id
, (SELECT id FROM tbl_fabric_type WHERE `name`=?) AS fabric_type_id
, (SELECT id FROM tbl_texture WHERE `name`=?) AS texture_id
, (SELECT id FROM tbl_thread_count WHERE `name`=?) AS thread_count_id";
			$q_check = $this->db->query($sql, array(
				$fabric_id,
				$vendor_id,
				$pattern,
				$primary_color,
				$secondary_color,
				$tertiary_color,
				$fabric_type,
				$texture,
				$thread_count
			));

			$o = $q_check->first_row();

			// FABRIC ID
			$r_data['id'] = $fabric_id;
			$r_data['name'] = $fabric_name;
			if(empty($o->fabric_id)){
				$r_data['action'] = 'insert';
				$r_data['fabric_message'] = 'Insert fabric';
			}else{
				$r_data['action'] = 'update';
				$r_data['fabric_message'] = 'Update fabric';
				$r_data['fabric_active'] = TRUE;
			}

			// FABRIC TYPE
			$r_data['fabric_type_id'] = $o->fabric_type_id;

			// VENDOR
			$r_data['supplier_id'] = $o->supplier_id;
			$r_data['supplier_name'] = $vendor_id;

			// STOCK TYPE
			$r_data['stock_type'] = (strtolower($stock_type)=='finite')?2:1;

			// COLOR
			$r_data['primary_color_id'] = $o->primary_color_id;
			$r_data['secondary_color_id'] = $o->secondary_color_id;
			$r_data['tertiary_color_id'] = $o->tertiary_color_id;
			$r_data['true_color'] = $true_color;

			// PATTERN
			$r_data['pattern_id'] = $o->pattern_id;
			$r_data['pattern_name'] = $pattern;

			// PATTERN
			$r_data['pattern_id'] = $o->pattern_id;
			$r_data['pattern_name'] = $pattern;

			// TEXTURE
			$r_data['texture_id'] = $o->texture_id;
			$r_data['texture_name'] = $texture;

			// THREAD COUNT
			$r_data['thread_count_id'] = $o->thread_count_id;
			$r_data['thread_count_name'] = $thread_count;

			// REMARK
			$r_data['remark'] = implode(PHP_EOL, $remark_arr);

			//print_r($q_check->first_row('array'));
			//print_r($r_data);
			//echo '<br /><br />';

			$r_data['error'] = $r_error;
			$r_data['error_message'] = $r_error_message;

			// check vendor

			//echo 'check fabric : '.$fabric_id.'<br />';
			//echo 'check vendor : '.$vendor_id.'<br />';

			array_push($result_arr, $r_data);
		}

//return;

		// do insert or update
		if(!empty($result_arr) && count($result_arr)>0){
			// update is_active = 0 all
			$this->fabric->update_all(array(
				'is_active'=>1
			));

			// check update or insert
			foreach($result_arr AS $r){
				if($r['action']=='insert'){
					$insert_key = array(
						'id',
						'fabric_type_id',
						'name',
						'supplier_id',
						'stock_type',
						'primary_color_id',
						'secondary_color_id',
						'tertiary_color_id',
						'true_color',
						'pattern_id',
						'texture_id',
						'thread_count_id',
						'remark'
					);
					$insert_val = array();
					foreach($insert_key AS $k){
						$insert_val[$k] = $r[$k];
					}
					// adjust data for model
					$insert_val['code'] = $insert_val['id'];
					unset($insert_val['id']);

					// set active
					$insert_val['is_active'] = 1;

					$this->fabric->insert($insert_val);
				}else if($r['action']=='update'){
					$update_key = array(
						'id',
						'fabric_type_id',
						'name',
						'supplier_id',
						'stock_type',
						'primary_color_id',
						'secondary_color_id',
						'tertiary_color_id',
						'true_color',
						'pattern_id',
						'texture_id',
						'thread_count_id',
						'remark'
					);
					$update_val = array();
					foreach($update_key AS $k){
						$update_val[$k] = $r[$k];
					}
					// adjust data for model
					$update_val['code'] = $update_val['id'];
					unset($update_val['id']);

					// set active
					$insert_val['is_active'] = 1;

					$this->fabric->update($update_val['code'], $update_val);
				}
			}


		}

		X::renderJSON(array(
			'success'=>true,
			'data'=>array(

			)
		));

	}

}