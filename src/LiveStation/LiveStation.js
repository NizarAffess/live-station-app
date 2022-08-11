import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiFillEdit } from 'react-icons/ai';
import { FaSquareFull } from 'react-icons/fa';
import './LiveStation.css';

const LiveStation = () => {
  const [link, setLink] = useState('');
  const [links, setLinks] = useState([]);
  const [linkId, setLinkId] = useState(null);
  const [editedLink, setEditedLink] = useState('');
  const [rowItems, setRowItems] = useState('default');

  const addLink = (e) => {
    e.preventDefault();
    const embedLink = link.replace("watch?v=", "embed/")
    const newLinks = links => [
      ...links, {
        id: uuidv4(),
        source: embedLink
      }
    ]
    setLinks(newLinks);
    setLink('');
  }

  const deleteLink = (id) => {
    setLinks(links => links.filter(link => link.id !== id))
  }

  const editLink = id => {
    const embedLink = editedLink.replace("watch?v=", "embed/")
    const updatedLinks = [...links].map(link => {
      if (link.id === id) {
        link.source = embedLink;
      }
      return link;
    });
    setLinks(updatedLinks);
    setLinkId(null);
  }

  useEffect(() => {
    console.log(links)
    console.log(rowItems)
  }, [links, rowItems]);

  return (
    <div className="live-container">
      <div className="nav-container">
        <form onSubmit={addLink}>
          <input
            type="text"
            onChange={e => setLink(e.target.value)}
            placeholder="Enter video link"
            value={link}
          />
        </form>
        <div className="number-controls">
          <button
            className="number-control"
            onClick={() => setRowItems('single')}
          >
            <FaSquareFull />
          </button>
          <button
            className="number-control"
            onClick={() => setRowItems('double')}
          >
            <FaSquareFull />
            <FaSquareFull />

          </button>
          <button
            className="number-control"
            onClick={() => setRowItems('default')}
          >
            <FaSquareFull />
            <FaSquareFull />
            <FaSquareFull />
          </button>
        </div>
      </div>
      <div className={"main-container " + rowItems}>
        {
          links.map(link => (
            <div
              className="screen-container"
              key={link.id}
            >
              <iframe
                src={link.source}
                className="video-box"
                title={link.id}
                frameBorder="0"
                allow="fullscreen;"
              >

              </iframe>
              {
                link.id === linkId ?
                  <div className="edit-controls">
                    <form onSubmit={() => editLink(link.id)}>
                      <input
                        type="text"
                        defaultValue={link.source}
                        onChange={e => setEditedLink(e.target.value)}
                      />
                      <IoMdArrowRoundBack
                        type="button"
                        onClick={() => setLinkId(null)}
                      />
                    </form>
                  </div>
                  :
                  <div className="link-controls">
                    <RiDeleteBin6Line
                      onClick={() => deleteLink(link.id)}
                    />
                    <AiFillEdit
                      onClick={() => setLinkId(link.id)}
                    />
                  </div>
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default LiveStation;