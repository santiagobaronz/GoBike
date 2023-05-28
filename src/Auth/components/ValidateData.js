
const validateData = (data, type) => {
	if(type == 'dataText'){
		const dataInfo = data.trim();
		const dataRegex = /^[a-zA-Z\s]+$/;
		return data !== '' && data.length <= 50 && dataRegex.test(dataInfo)
	}

	if(type == 'dataEmail'){
		const email = data;
		const dataRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return  data !== '' && dataRegex.test(email);
	}

	if(type == 'dataPassword'){
		const password = data;
		const dataRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z0-9!@#$%^&*()_+{}|:<>?~\-=[\]\;',./\\]).{8,}$/;
		return data !== '' && dataRegex.test(password);
	}

	if(type == 'dataNumber' || type == 'dataPhone'){
		const number = data;
		const dataRegex = /^\d+$/;
		if(type == 'dataPhone'){
			return data !== '' && data.length == 10 && dataRegex.test(number);
		}else{
			return data !== '' && dataRegex.test(number);
		}
		
	}

	if(type == 'dataDate'){
		const date = data;
		const dataRegex = /^(19|20)\d{2}-(0?[1-9]|1[0-2])-(0?[1-9]|1\d|2\d|3[01])$/;
		return data !== '' && dataRegex.test(date);
	}

}

export default validateData;