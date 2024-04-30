const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const ProfessionalService = require('./professional.service');
const service = new ProfessionalService();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');

class AuthService {
  async getProfessional(email, password) {
    const professional = await service.findByEmail(email);
    if (!professional) {
      throw boom.unauthorized('This is not a valid email');
    }
    const isMatch = await bcrypt.compare(password, professional.password);
    if (!isMatch) {
      throw boom.unauthorized('You are not authorized');
    }
    delete professional.dataValues.password;
    return professional;
  }
  signToken(professional) {
    const payload = {
      sub: professional.customer.id,
      role: professional.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return { professional, token };
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const professional = await service.findOne(payload.sub);
      if (professional.recoveryToken !== token) {
        throw boom.unauthorized('Falla en el token');
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(professional.id, { recoveryToken: null, password: hash });
      return { message: 'Password has been changed' };
    } catch (error) {
      throw boom.unauthorized(
        'No puedes cambiar la password. Contactate con el equipo de soporte.'
      );
    }
  }

  async sendRecovery(email) {
    const professional = await service.findByEmail(email);
    if (!professional) {
      throw boom.unauthorized('No tienes autorizacion para entrar');
    }
    const payload = { sub: professional.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `${config.changePasswordLink}?token=${token}`;
    await service.update(professional.id, { recoveryToken: token });
    const mail = {
      from: config.nodeMailProfessional, // sender address
      to: professional.email, // list of receivers
      subject: 'Recuperar cuenta Pediclick', // Subject line
      //text: "Hello worlsdfd?", // plain text body
      //TODO - Hacer el formato de la informacion qu el ellega por mail.
      html: `<b>Ingresa a este link: ${link} para recuperar la contraseña.</b>`, // html body
    };
    const rta = await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      // PODEMOS CAMBIAR EL PUERTO
      secure: true, // true for 465, false for other ports
      auth: {
        professional: config.nodeMailProfessional,
        pass: config.nodeMailPassword,
      },
    });

    // send mail with defined transport object
    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' };
  }
}

module.exports = AuthService;
