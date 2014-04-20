<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class fabric extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->library('form_validation');

		$this->load->library('PHPExcel');
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
		//echo '-------------------------------'.PHP_EOL;
		print_r($ulResult);
		//echo '-------------------------------'.PHP_EOL;
		if (!$ulResult)
		{
			echo 'FAILURE';
		}
		else
		{
			//$ulData = $this->upload->data();
			//$this->read_excel($ulData['full_path']);
			// read excel
			//$this->read_excel($file)

			echo 'SUCCESS';
		}
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
		$file = FCPATH.'upload_temp/fabric/3b1388b88d46f8d5f91152410537cc4a.xlsx';
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
		for ($row = 1; $row <= $highestRow; ++$row) {
			// ข้อมูลจะเริ่มหลังจาก row ที่ 2
			if($row<2) continue;

			$err = array();

			$fabric_id = $this->getCellValue($objSheet, 'B'.$row);
			$vendor_id = $this->getCellValue($objSheet, 'C'.$row);
			$vendor_code = $this->getCellValue($objSheet, 'D'.$row);
			$pattern = $this->getCellValue($objSheet, 'E'.$row);
			$primary_color = $this->getCellValue($objSheet, 'F'.$row);
			$secondary_color = $this->getCellValue($objSheet, 'G'.$row);
			$tertiary_color = $this->getCellValue($objSheet, 'H'.$row);
			$fabric_type = $this->getCellValue($objSheet, 'I'.$row);

			$wholesale_price = $this->getCellValue($objSheet, 'J'.$row);
			$mid_price = $this->getCellValue($objSheet, 'K'.$row);
			$retail_price = $this->getCellValue($objSheet, 'L'.$row);
			$buy = $this->getCellValue($objSheet, 'M'.$row);
			$stock_count = $this->getCellValue($objSheet, 'N'.$row);


			$texture = $this->getCellValue($objSheet, 'O'.$row);
			$material = $this->getCellValue($objSheet, 'P'.$row);
			$thread_count = $this->getCellValue($objSheet, 'Q'.$row);
			$construction = $this->getCellValue($objSheet, 'R'.$row);
			$finishing = $this->getCellValue($objSheet, 'S'.$row);
			$fabric_name = $this->getCellValue($objSheet, 'U'.$row);
			$true_color = $this->getCellValue($objSheet, 'V'.$row);
			$stock_type = $this->getCellValue($objSheet, 'W'.$row);

			// check fabric
			$sql = "SELECT
(SELECT id FROM tbl_fabric WHERE id=?) AS fabric_id
, (SELECT id FROM tbl_supplier WHERE `name`=?) AS supplier_id
, (SELECT id FROM tbl_pattern WHERE `name`=?) AS pattern_id
, (SELECT id FROM tbl_color WHERE `name`=?) AS primary_color_id
, (SELECT id FROM tbl_color WHERE `name`=?) AS secondary_color_id
, (SELECT id FROM tbl_color WHERE `name`=?) AS tertiary_color_id
, (SELECT id FROM tbl_color WHERE `name`=?) AS true_color_id
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
				$true_color,
				$fabric_type,
				$texture,
				$thread_count
			));

			print_r($q_check->first_row('array'));
			echo '<br /><br />';

			// check vendor

			//echo 'check fabric : '.$fabric_id.'<br />';
			//echo 'check vendor : '.$vendor_id.'<br />';

		}
	}

}