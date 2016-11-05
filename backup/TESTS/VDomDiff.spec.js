import sinon from 'sinon';
import { expect } from 'chai';

import VDomDiff from 'VDomDiff';

let t1 = null;
let t2 = null;
let t1Child = null;
let t2Child = null;

context('VDomDiff', () => {
  context('create new VDomDiff', () => {
    it('should create empty patch object', () => {
      const patchFn = sinon.stub(VDomDiff.prototype, 'patch');
      t1 = document.createTextNode('T1');
      t2 = document.createTextNode('T2');
      const diff = new VDomDiff(t1, t2);

      patchFn.restore();

      expect(patchFn).to.be.calledWith(t1, t2);
      expect(diff.patchObject).to.be.eql([]);
    });
  });

  context('patch', () => {
    it('should call traverse selected dom nodes', () => {
      const traverseFn = sinon.stub(VDomDiff.prototype, 'traverse');
      t1 = document.createTextNode('T1');
      t2 = document.createTextNode('T2');
      const diff = new VDomDiff(t1, t2);

      traverseFn.restore();

      expect(traverseFn).to.be.calledWith(t1, t2, 0);
      expect(diff.patchObject).to.be.eql([]);
    });
  });

  context('traverse', () => {
    it('should not call diff nodes when nodes are equal', () => {
      const difFn = sinon.stub(VDomDiff.prototype, 'diffNodes');
      t1 = document.createTextNode('T1');
      const diff = new VDomDiff(t1, t1);

      difFn.restore();

      expect(difFn).not.to.be.called;
      expect(diff.patchObject).to.be.eql([]);
    });

    it('should call diff nodes when nodes are not equal', () => {
      const difFn = sinon.stub(VDomDiff.prototype, 'diffNodes');
      t1 = document.createTextNode('T1');
      t2 = document.createTextNode('T2');
      const diff = new VDomDiff(t1, t2);

      difFn.restore();

      expect(difFn).to.be.calledWith(t1, t2, 0);
      expect(diff.patchObject).to.be.eql([]);
    });
  });

  context('diffNodes', () => {
    context('two text nodes', () => {
      beforeEach(() => {
        t1 = document.createTextNode('T1');
        t2 = document.createTextNode('T2');
      });
      afterEach(() => {
        t1 = null;
        t2 = null;
      });

      it('should compare two nodes', () => {
        const diff = new VDomDiff(t1, t2);

        expect(diff.patchObject).to.be.eql([{
          type: 'CONTENT',
          source: t1,
          target: t2,
        }]);
      });

      it('should compare two nodes when T1 has zero childrens', () => {
        t1.children = [];
        const diff = new VDomDiff(t1, t2);

        expect(diff.patchObject).to.be.eql([{
          type: 'CONTENT',
          source: t1,
          target: t2,
        }]);
      });

      it('should compare two nodes when T2 has not any childrens', () => {
        t1.children = true;
        t2.children = false;
        const diff = new VDomDiff(t1, t2);

        expect(diff.patchObject).to.be.eql([{
          type: 'CONTENT',
          source: t1,
          target: t2,
        }]);
      });

      it('should compare two nodes when T2 has zero childrens', () => {
        t1.children = true;
        t2.children = [];
        const diff = new VDomDiff(t1, t2);

        expect(diff.patchObject).to.be.eql([{
          type: 'CONTENT',
          source: t1,
          target: t2,
        }]);
      });

      it('should not return any patch when T1 has same content as T2', () => {
        t1.textContent = 'T1';
        t2.textContent = 'T1';
        const diff = new VDomDiff(t1, t2);

        expect(diff.patchObject).to.be.eql([]);
      });

      context('applyPatch', () => {
        it('should apply patch to a target node', () => {
          new VDomDiff(t1, t2).applyPatch();
          expect(t2.textContent).to.be.eql(t1.textContent);
        });
      });
    });

    context('two div nodes', () => {
      beforeEach(() => {
        t1 = document.createElement('div');
        t2 = document.createElement('div');
        t1Child = document.createElement('div');
        t2Child = document.createElement('div');

        t1Child.appendChild(document.createTextNode('T1'));
        t2Child.appendChild(document.createTextNode('T2'));

        t1.appendChild(t1Child);
        t2.appendChild(t2Child);
      });

      afterEach(() => {
        t1 = null;
        t2 = null;
        t2Child = null;
        t2Child = null;
      });

      it('should proceed to traverse when childrens are set', () => {
        const traverseFn = sinon.stub(VDomDiff.prototype, 'traverse');
        new VDomDiff(t1, t2).applyPatch();

        traverseFn.restore();

        expect(traverseFn).to.be.called;
      });

      it('should iterate through childrens and create patch', () => {
        const diff = new VDomDiff(t1, t2);

        expect(diff.patchObject).to.be.eql([{
          type: 'CONTENT',
          source: t1Child,
          target: t2Child,
        }]);
      });

      it('should iterate through childrens and replace them', () => {
        new VDomDiff(t1, t2).applyPatch();
        expect(t2Child.textContent).to.be.eql(t1Child.textContent);
      });
    });
  });
});
