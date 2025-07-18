import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ContactMessage = sequelize.define('ContactMessage', {
  id:       { type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true },
  name:     { type:DataTypes.STRING,  allowNull:false },
  email:    { type:DataTypes.STRING,  allowNull:false },
  phone:    { type:DataTypes.STRING },
  address:  { type:DataTypes.STRING },
  message:  { type:DataTypes.TEXT,    allowNull:false }
}, {
  timestamps:true
});

export default ContactMessage;
