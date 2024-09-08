exports.home = function(req, res, podName, podIP, vaultUsername, vaultPassword) {
  res.render('home', {
      podName: podName,
      podIP: podIP,
      vaultUsername: vaultUsername,
      vaultPassword: vaultPassword
  });
};

exports.login = function(req, res) {
  res.render('login');
};
