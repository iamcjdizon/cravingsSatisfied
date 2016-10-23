<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Dyosas extends MX_Controller {

	public function __construct() 
	{
		parent::__construct();		
		$this->base_url = base_url();
	}

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		//echo 'Hello';
		//$this->load->view('welcome_message');
		$this->load->view('home.html');
	}

	public function ajaxAddComment()
	{
		$json = [];

		$params['name'] = addslashes($this->input->post('name')); //remove the ' in the input.
		$params['feedback'] = addslashes($this->input->post('comment'));

		$this->load->model('dyosas_model');
		$res = $this->dyosas_model->addUser($params);
		if($res)
			$json['result'] = 1; //true
		else
			$json['result'] = 0; //false

		echo json_encode($json);
	}

}
