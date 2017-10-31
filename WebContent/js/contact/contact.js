/**
 * @author 何明胜
 * 
 * 2017年9月26日
 */

/**
 * 按钮初始化
 * 
 * @returns
 */
$(function(){
	//重置表单
	$('#form_contactAdmin')[0].reset();
	
	//添加表单验证
	contactFormValidate();
	
	//发送邮件点击事件
	sendEmailClick();
});

/**
 * 联系站长表单添加合法验证
 * 
 * @returns
 */
function contactFormValidate() {
	$('#form_contactAdmin').bootstrapValidator({
		message : '输入无效!',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			contactName : {
				message : '姓名无效!',
				validators : {
					notEmpty : {
						message : '姓名不能为空!'
					}
				}
			},
			contactEmail : {
				validators : {
					notEmpty : {
						message : '邮箱为必填哦!'
					},
					emailAddress : {
						message : '输入邮件地址无效!'
					}
				}
			},
			contactPhone : {
				regexp : {
					regexp : /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/,
					message : '手机号无效'
				}
			},
			contactContent : {
				validators : {
					notEmpty : {
						message : '内容怎么能为空呢'
					},
				}
			}
		}
	});
}

/**
 * 发送邮件点击事件
 * @returns
 */
function sendEmailClick() {
	$("#btn_sendEmail").click(function() {
		// 进行表单验证
		var $formContactAdmin = $('#form_contactAdmin').data('bootstrapValidator');
		$formContactAdmin.validate();
		if ($formContactAdmin.isValid()) {
			// 发送ajax请求
			$.ajax({
				url : '/sendEmail',
				async : false,// 同步，会阻塞操作
				type : 'POST',// PUT DELETE POST
				data : $('#form_contactAdmin').serialize(),
				success : function(result) {
					if(result == 1){
						$.confirm({
						    title: '发送成功',
						    content: textStatus + " : " + XMLHttpRequest.status,
						    autoClose: 'ok|1000',
						    type: 'green',
						    buttons: {
						    	ok: {
						            text: "确认",
						            btnClass: 'btn-primary',
						        },
						    }
						});
						$('#form_contactAdmin')[0].reset();
					}else{
						$.confirm({
						    title: '发送失败，建议尝试重新发送',
						    content: textStatus + " : " + XMLHttpRequest.status,
						    autoClose: 'ok|1000',
						    type: 'red',
						    buttons: {
						    	ok: {
						            text: "确认",
						            btnClass: 'btn-primary',
						        },
						    }
						});
					}
				},
				error : function(XMLHttpRequest, textStatus){
					$.confirm({
					    title: '发送邮件出错',
					    content: textStatus + " : " + XMLHttpRequest.status,
					    autoClose: 'ok|1000',
					    type: 'green',
					    buttons: {
					    	ok: {
					            text: "确认",
					            btnClass: 'btn-primary',
					        },
					    }
					});
				}
			});
		}
	});
}