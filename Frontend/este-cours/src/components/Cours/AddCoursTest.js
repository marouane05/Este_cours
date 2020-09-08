import React, { Component ,PropTypes} from 'react';
import ReactPlayer from 'react-player'
import '../../styles/PdfView.css'
import PDFViewer from 'pdf-viewer-reactjs'
import CustomNavigation from './NavigationPdf'
import 'pdf-viewer-reactjs-bulma-wrapped/css/main.css'

//import { MobilePDFReader } from 'react-pdf-viewer';
export default class AddCoursTest extends Component {

   
  render() {

    const WithCustomNavigationStyles = () => (
      <div className='col-sm-12 text-center'>
          <h1 className='text-white bg-info rounded'>Custom css classes</h1>
          <div className='border rounded'>
              <PDFViewer
                  document={{
                   //   url: sources.url,
                  }}
                  css='customViewer'
                  canvasCss='customCanvas'
                  navigation={{
                      css: {
                          navbarWrapper: 'customWrapper',
                          zoomOutBtn: 'customPrevBtn',
                          resetZoomBtn: 'customResetBtn',
                          zoomInBtn: 'customNextBtn',
                          previousPageBtn: 'customPrevBtn',
                          pageIndicator: 'customPages',
                          nextPageBtn: 'customNextBtn',
                          rotateLeftBtn: 'customPrevBtn',
                          resetRotationBtn: 'customResetBtn',
                          rotateRightBtn: 'customNextBtn',
                      },
                  }}
              />
          </div>
      </div>
  )
  
    return (
   /*   <div className='player-wrapper'>
       <ReactPlayer
        className='react-player'
       url='/karamifahd/Langage%20C/Initiation%20Algo.mp4'
       width='100%'
          height='100%' />
      </div>
*/

<div className='container ' >
<div className="row justify-content-center">
        <div className="col-md-14">
                <div className="card ">

<div className='col-sm-12 text-center'>
        <h1 className='text-white bg-info rounded'>Cours Algorithmique</h1>
        <div className='border rounded'>
            <PDFViewer
                document={{
                    url: '/karamifahd/Langage%20C/algo0.pdf',
                }}
                showThumbnail={{ scale: 3 }}
            />
        </div>
    </div>
</div>
</div>
</div>
</div>


     
    );
 
 
  }
  
}

 // Can be an object with css classes or react elements to be rendered
 