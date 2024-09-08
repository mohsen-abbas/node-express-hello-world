exports.home = function(req, res, podName, podIP) {
  res.render('home', { podName: podName, podIP: podIP });
};

exports.login = function(req, res) {
  res.render('login');
};
