
const PDFDocument = require("pdfkit-table");
const User = require("../models/user")

const data = []

User.find()
    .then((users) => {
        for (let i= 0; i < users.length; i++) {
            data.push(users[i])
        }
    })
    .catch((err) => {
        console.log(err)
    })



const pdfViewer = async (req, res, next) => {
    // table
    let doc = new PDFDocument({ margin: 30, size: 'A4' });

    const tableData = data.map((ele, i) => {
        return {index: i, name: ele.name, mobile: ele.mobile, username: ele.username}
    })
    const table = {
      title: "Users Data",
      subtitle: "Users Data Table",
      headers: [
        { label: "S.No", property: 'index', width: 60, renderer: null },
        { label: "Name", property: 'name', width: 150, renderer: null }, 
        { label: "Mobile", property: 'mobile', width: 100, renderer: null }, 
        { label: "E-mail/Username", property: 'username', width: 100, renderer: null }, 
      ],
      // complex data
      datas: tableData
    };
    
   await doc.table(table, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
      prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
        doc.font("Helvetica").fontSize(8);
        indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
      },
    });
    // done!
    doc.pipe(res)
    doc.end();
  };

  module.exports = pdfViewer
