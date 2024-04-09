"use client";
import React, { useState } from 'react';
import './home.css';
import { FaCheck } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import Image from 'next/image';
interface Item {
  id: number;
  name: string;
  img: string;
}

interface Items {
  source1: Item[];
  source2: Item[];
  source3: Item[];
  right: Item[];
}
const initialItems: Items = {
  source1: [
  ],
  source2: [],
  source3: [],
  right: [{ id: 1, name: "Battery", img: "/9vBattery.png" },
  { id: 2, name: "AC", img: "/AC.png" },
  { id: 3, name: "Home Battery", img: "/Home Battery.png" },
  { id: 4, name: "Nail", img: "/nail.png" },
  { id: 5, name: "Refrigerator", img: "/Refrigerator.png" },
  { id: 6, name: "Fan", img: "/Table Fan.png" },
  { id: 7, name: "Electric Socket", img: "/Wall Outlet.png" },
  { id: 8, name: "Switch", img: "/Wall Switch.png" },
  { id: 9, name: "Wire", img: "/Wire.png" }
  ],
};

const Home = () => {
  const [items, setItems] = useState<Items>(initialItems);
  const onDragStart = (e: React.DragEvent<HTMLDivElement>, sourceId: string, index: number) => {
    e.dataTransfer.setData('sourceId', sourceId);
    e.dataTransfer.setData('index', index.toString());
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    const sourceId: string = e.dataTransfer.getData('sourceId');
    const index: number = Number(e.dataTransfer.getData('index'));
    const item = items[sourceId as keyof Items][index];

    if (sourceId !== targetId) {
      const updatedSource = items[sourceId as keyof Items].filter((_: Item, i: number) => i != Number(index));
      const updatedTarget = [...items[targetId as keyof Items], item];
      console.log(targetId, updatedTarget.length)
      if (targetId != 'right' && updatedTarget.length > 3) {
        return
      }
      setItems({
        ...items,
        [sourceId]: updatedSource,
        [targetId]: updatedTarget,
      });
    }
  };

  const Reset = () => {
    setItems(initialItems)
  }
  const Check = () => {
    const source1Class: NodeListOf<Element> = document.querySelectorAll('.source1');
    items.source1.forEach((item: Item, i: number) => {
      if (item.name === 'Battery' || item.name === 'Home Battery' || item.name === 'Electric Socket') {
        source1Class[i]?.classList.add('green')
      }
      else {
        source1Class[i]?.classList.add('red')
      }
    })
    const source2Class: NodeListOf<Element> = document.querySelectorAll('.source2');
    items.source2.forEach((item: Item, i: number) => {
      if (item.name === 'AC' || item.name === 'Fan' || item.name === 'Refrigerator') {
        source2Class[i]?.classList.add('green')
      }
      else {
        source2Class[i]?.classList.add('red')
      }
    })
    const source3Class: NodeListOf<Element> = document.querySelectorAll('.source3');
    items.source3.forEach((item: Item, i: number) => {
      if (item.name === 'Nail' || item.name === 'Switch' || item.name === 'Wire') {
        source3Class[i]?.classList.add('green')
      }
      else {
        source3Class[i]?.classList.add('red')
      }
    })
  }
  return (
    <div className="main">
      <div className="left">
        <div className="itemCard">
          <button className='source marginL'>Source</button>
          <div
            className="Cards"
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, 'source1')}
          >
            {items.source1.map((item: Item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => onDragStart(e, 'source1', index)}
                className='source1'
              >
                <div className="card">
                  <Image src={item.img} height={129.91} width={69} alt={item.name} />
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
            {items.source1.length === 0 && <div className="empty">Drop Items here...</div>}
          </div>
        </div>
        <div className="itemCard">
          <button className='source marginL'>Load</button>
          <div
            className="Cards"
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, 'source2')}
          >
            {items.source2.map((item: Item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => onDragStart(e, 'source2', index)}
                className='source2'
              >
                <div className="card">
                  <Image src={item.img} height={129.91} width={69} alt={item.name} />
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
            {items.source2.length === 0 && <div className="empty">Drop Items here...</div>}

          </div>
        </div>
        <div className="itemCard">
          <button className='source marginL'>Path</button>
          <div
            className="Cards"
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, 'source3')}
          >
            {items.source3.map((item: Item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => onDragStart(e, 'source3', index)}
                className='source3'
              >
                <div className="card">
                  <Image src={item.img} height={129.91} width={69} alt={item.name} />
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
            {items.source3.length === 0 && <div className="empty">Drop Items here...</div>}

          </div>
        </div>
      </div>
      <div className="right" onDrop={(e) => onDrop(e, 'right')} onDragOver={(e) => onDragOver(e)}>
        <div className="Cards justify-center"  >
          {items.right.map((item: Item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => onDragStart(e, 'right', index)}
            >
              <div className="card">
                <Image src={item.img} height={129.91} width={69} alt={item.name} />
                <span>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="buttons">
        <button className="check" onClick={Check}><FaCheck /> Check</button>
        <button className="reset" onClick={Reset}><GrPowerReset />Reset</button>
      </div>
    </div>
  );
};

export default Home;
