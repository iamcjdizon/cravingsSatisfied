<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**

**/

class Dyosas_model extends CI_Model
{

	public function addUser($params = array())
	{
		/*$ret = $this->db->insert('users',$users);
		if($this->db->affected_rows() >= 1)
			return true;
		else
			return false;*/

		$r = $this->db->insert('feedbackTBL', $params);
		if($r)
			return true;
		else
			return false;

	}

	

}