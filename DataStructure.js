const MySorts = {
    BaseAlgorithms: {
        Find_Max : (arr) => {
            let max = arr[0];
            for (let i=1; i < arr.length; i++)
            {if (max < arr[i]) {max = arr[i];}}
            return max;
        },
        swap : (arr,i,j) => {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        },
        MySwitch : (arr1,arr2) => {
            for (let i=0; i < arr1.length; i++)
            {arr1[i] = arr2[i];}
        },
        merge : (arr1, arr2) => {
            let arr = [];
            let i = 0, j = 0;
            while (i < arr1.length && j < arr2.length) {
                if (arr1[i] < arr2[j]) { arr.push(arr1[i]); i++;}
                else { arr.push(arr2[j]); j++;}
            }
            while (i < arr1.length) { arr.push(arr1[i]); i++;}
            while (j < arr2.length) { arr.push(arr2[j]); j++;}
            return arr;
        }
    },
    LinearSorts: {
        Counting_Sort_For_Radix : (arr,arr2) => {
            let cnt = [], len = arr.length;
            var out = new Array(arr.length);
            for (let i=0; i < 11; i++) {cnt.push(0);}
            for (let i=0; i < len; i++) {cnt[arr2[i]]++;}
            for (let i=1; i < 11; i++) {cnt[i]+=cnt[(i-1)];}
            for (let i=(len-1); i >= 0; i--)
            {out[(cnt[arr2[i]]-1)]=arr[i]; cnt[arr2[i]]--;}
            MySorts.BaseAlgorithms.MySwitch(arr,out);
        },
        Counting_Sort : (arr) =>
        {MySorts.LinearSorts.Counting_Sort_For_Radix(arr,arr);},
        Radix_Sort : (arr) => {
            let max = MySorts.BaseAlgorithms.Find_Max(arr), dig_cnt = 0;
            let dec = 1;
            while (Math.floor(max) > 0) {
                max /= 10;
                dig_cnt++;
            }
            for (let i=0; i < dig_cnt; i++) {
                let dig_arr = arr.map(x => x = Math.floor((x/dec)%10));
                MySorts.LinearSorts.Counting_Sort_For_Radix(arr,dig_arr);
                dec *= 10;
            }
        },
        Bucket_Sort : (arr) => {
            let out = [];
            let options = {
                0: [],
                1: [],
                2: [],
                3: [],
                4: [],
                5: [],
                6: [],
                7: [],
                8: [],
                9: [],
                10: []
            };
            for (let i=0; i < arr.length; i++) {
                options[arr[i]].push(arr[i]);
            }
            for (let i=0; i < 11; i++) {
                let len = options[i].length;
                for (let j=0; j < len; j++) {
                    out.push(options[i][j]);
                }
            }
            MySorts.BaseAlgorithms.MySwitch(arr,out);
        }
    },
    CompareSorts: {
        Merge_Sort : (arr) => {
            if (arr.length === 1) {return arr;}
            var left = new Array(Math.floor(arr.length/2));
            var right = new Array(Math.ceil(arr.length/2));
            for (let i=0; i < Math.floor(arr.length/2); i++) {
                left[i] = arr[i];
            }
            let cur = Math.floor(arr.length/2);
            for (let j=0; j < Math.ceil(arr.length/2); j++) {
                right[j] = arr[cur];
                cur++;
            }
            return MySorts.BaseAlgorithms.merge(MySorts.CompareSorts.Merge_Sort(left),MySorts.CompareSorts.Merge_Sort(right));
        },
        Insertion_Sort : (arr) => {
            let key, len = arr.length, j;
            for (let i=0; i < len; i++) {
                key = arr[i];
                j = (i-1);
                while (j >= 0 && key < arr[j])
                {arr[(j+1)]=arr[j]; j--;}
                arr[(j+1)] = key;
            }
        },
        Selection_Sort : (arr) => {
            for (let i=0; i < arr.length; i++) {
                for (let j=(i+1); j < arr.length; j++) {
                    if (arr[i] > arr[j])
                    {MySorts.BaseAlgorithms.swap(arr,i,j);}
                }
            }
        },
        Heap_Sort : (arr) => {
            Heaps.Build_Heap(arr);
            const last = (arr.length-1);
            for (let i = last; i > 0; i--) {
                MySorts.BaseAlgorithms.swap(arr,0,i);
                Heaps.Heapify_Down(arr,0,i);
            }
        },
        Quick_Sort : (arr,p,r) => {
            if (p < r) {
                let q = SelectProducts.Partition(arr,p,r);
                MySorts.CompareSorts.Quick_Sort(arr,p,q-1);
                MySorts.CompareSorts.Quick_Sort(arr,q+1,r);
            }
        },
        Bubble_Sort : (arr) => {
            for (let i=0; i < arr.length; i++) {
                for (let j=0; j < arr.length-i; j++)
                {if (arr[j] > arr[(j+1)]) {MySorts.BaseAlgorithms.swap(arr,j,(j+1));}}
            }
        }
    }
}

const Heaps = {
    Heapify_Down : (arr,i,ls) => {
        let r = Heaps.right(i), l = Heaps.left(i), large = i, len = ls;
        if (l < len && arr[l] > arr[i]) {large = l;}
        if (r < len && arr[r] > arr[large]) {large = r;}
        if (i !== large) {
            MySorts.BaseAlgorithms.swap(arr,i,large);
            Heaps.Heapify_Down(arr,large,ls);
        }
    },
    left : i => i = 2*i,
    right : i => i = (2*i + 1),
    parent : i => i = Math.floor(i/2),
    Heapify_Up : (arr,i) => {
        let p = Heaps.parent(i);
        if (arr[i] > arr[p]) {
            MySorts.BaseAlgorithms.swap(arr,p,i);
            Heaps.Heapify_Up(arr,p);
        }
    },
    Build_Heap : (arr) => {
        let half = Math.floor(arr.length/2);
        for (let i = half; i > -1; i--)
        {Heaps.Heapify_Down(arr,i,arr.length);}
    },
    Heap_Insert : (arr,key) => {
        arr.push(key);
        Heaps.Heapify_Up(arr,(arr.length-1));
    },
    Heap_Extract_Max : (arr) => {
        let max = arr[0];
        arr[0] = arr[(arr.length-1)];
        arr.pop();
        Heaps.Heapify_Down(arr,0,arr.length);
        return max;
    }
}

const SelectProducts = {
    MySlice : (arr,p,r) => {
        let res = [];
        for (let i=p; i <= r; i++) {res.push(arr[i]);}
        return res;
    },
    Partition : (arr,p,r) => {
        const x = arr[r];
        let i = (p-1);
        for (let j=p; j <= (r-1); j++) {
            if (arr[j] <= x) {
                i++;
                MySorts.BaseAlgorithms.swap(arr,i,j);
            }
        }
        MySorts.BaseAlgorithms.swap(arr,i+1,r);
        return (i+1);
    },
    Partition_With_Pivot : (arr,p,r,q) => {
        MySorts.BaseAlgorithms.swap(arr,q,r);
        return SelectProducts.Partition(arr,p,r);
    },
    Choose_Value : (arr,p,r) => {
        if ((r-p) < 5) {
            MySorts.CompareSorts.Heap_Sort(arr);
            return arr[Math.floor(r/2)];
        }
        let k = p, res = [];
        while (k <= r) {
            let a = [], i = 0;
            while (k <= r && i < 5)
            {a.push(arr[k]); i++; k++;}
            MySorts.CompareSorts.Heap_Sort(a);
            if (a.length > 0)
            {res.push(a[Math.floor(a.length/2)]);}
        }
        return SelectProducts.Choose_Value(res,0,(res.length-1));
    },
    Choose_Pivot : (arr,p,r) => {
        let x = SelectProducts.Choose_Value(arr,p,r);
        for (let i=p; i <= r; i++)
        {if (x === arr[i]) {return i;}}
    },
    select : (arr,p,r,i) => {
        if (p === r) {return arr[p];}
        let x = SelectProducts.Choose_Pivot(arr,p,r);
        let q = SelectProducts.Partition_With_Pivot(arr,p,r,x);
        let k = (q-p+1);
        if (i === k) {return arr[q];}
        let temp1 = SelectProducts.MySlice(arr,p,q-1);
        let temp2 = SelectProducts.MySlice(arr,q+1,r);
        if (i < k) {return SelectProducts.select(temp1,0,(temp1.length-1),i);}
        return SelectProducts.select(temp2,0,(temp2.length-1),i-k);
    }
}

const FunAlgorithms = {
    fibo : (num) => {
        if (num < 2) {return num;}
        return (FunAlgorithms.fibo(num-1) + FunAlgorithms.fibo(num-2));
    },
    Binary_Search : (arr,key,p,r) => {
        if (r < p) {return false;}
        let mid = Math.floor((p+r)/2);
        if (arr[mid] === key) {return mid;}
        if (key < arr[mid])
        {return FunAlgorithms.Binary_Search(arr,key,p,mid-1)}
        return FunAlgorithms.Binary_Search(arr,key,mid+1,r);
    }
}

const HashTable = {
    HashCreate : () => {
        let HashTable = [];
        for (let i=0; i < 100; i++) {HashTable.push([]);}
        return HashTable;
    },
    HashInsert : (hash,num) => {
        let check = Math.abs(num);
        if (check >= 10000) {return false;}
        else if (check < 1)
        {hash[Math.floor(check * 100)].push(num);}
        else if (check >= 1 && check < 100)
        {hash[Math.floor(check)].push(num);}
        else {hash[Math.floor(check / 100)].push(num);}
        return true;
    },
    HashInsertArray : (hash,arr) => {
        let len = arr.length;
        for (let i=0; i < len; i++) {
            if (!HashTable.HashInsert(hash,arr[i]))
            {return false;}
        }
        return true;
    },
    HashSearch : (hash,num) => {
        if (Math.abs(num) >=10000) {return false;}
        let check = Math.abs(num), loc = [];
        let area, len, flag = true;
        if (check < 1) {
            area = Math.floor(check * 100);
            len = hash[area].length;
            for (let i=0; i < len; i++) {
                if (hash[area][i] === num) {
                    loc.push(area);
                    loc.push(i);
                    flag = false;
                    return loc;
                }
            }
            if (flag) {return false;}
        }
        if (check >= 1 && check <= 100) {
            area = Math.floor(check);
            len = hash[area].length;
            for (let i=0; i < len; i++) {
                if (hash[area][i] === num) {
                    loc.push(area);
                    loc.push(i);
                    flag = false;
                    return loc;
                }
            }
            if (flag) {return false;}
        }
        else {
            area = Math.floor(check / 100);
            len = hash[area].length;
            for (let i=0; i < len; i++) {
                if (hash[area][i] === num) {
                    loc.push(area);
                    loc.push(i);
                    flag = false;
                    return loc;
                }
            }
            if (flag) {return false;}
        }
    },
    HashDelete : (hash,num) => {
        let vari = HashTable.HashSearch(hash,num);
        if (!vari) {return false;}
        else {
            MySorts.BaseAlgorithms.swap(hash[vari[0]],vari[1],hash[vari[0]].length-1);
            hash[vari[0]].pop();
        }
    }
}

const logic = {
    hets : (from,to) => {
        if (from) {return to;}
        else {return true;}
    },
    Imm : (alpha,beta) => {
        return !(logic.hets(logic.hets(alpha,beta),!logic.hets(beta,alpha)));
    },
    Or : (alpha,beta) => {
        return logic.hets(!alpha,beta);
    },
    Nor : (alpha,beta) => {
        return !(logic.hets(!alpha,beta));
    },
    And : (alpha,beta) => {
        return !(logic.hets(alpha,!beta));
    },
    Nand : (alpha,beta) => {
        return logic.hets(alpha,!beta);
    },
    Exist : (arr,bool) => {
        let len = arr.length, flag = false;
        for (let i=0; i < len; i++)
        {if (bool(arr[i])) {flag = true; break;}}
        return flag;
    },
    ToAll : (arr,bool) => {
        const op = (num) => {
            if (bool(num)) {return false;}
            else {return true;}
        }
        return !logic.Exist(arr,op);
    }
}